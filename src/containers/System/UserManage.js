import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createANewUser} from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           arrUsers: [],
           isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    handleAddNewUser = () => {
      this.setState({
        isOpenModalUser: true
      })
    }

    getAllUserFromReact = async () => {
      let response = await getAllUsers('All');
        if( response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    toggleUserModal = () => {
      this.setState({
        isOpenModalUser: !this.state.isOpenModalUser,
      })
    }

    createNewUser = async (data) => {
      try{
        let response = await createANewUser(data)
        if(response && response.errCode !== 0) {
          alert(response.errMessage)
        } else {
          await this.getAllUserFromReact();
          this.setState({
            isOpenModalUser: false
          })
        }
      }catch(e) {
        console.log(e)
      }
      
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                   isOpen = {this.state.isOpenModalUser}
                   toggleUserModal = {this.toggleUserModal}
                   createNewUser = {this.createNewUser}
                />
                <div className='title text-center'>Manage users with Thao</div>
                <div className='mx-1'>
                  <button
                    className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus px-2'></i>Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                  <table id="customers">
                    <tr>
                      <th>Email</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.map((item, index) =>{
                        return (
                            <tr>
                              <td>{item.email}</td>
                              <td>{item.firstName}</td>
                              <td>{item.lastName}</td>
                              <td>{item.address}</td>
                              <td>
                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                <button className='btn-delete'><i className="fas fa-trash"></i></button>
                              </td>
                            </tr>
                        )
                      })
                    }
                  </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
