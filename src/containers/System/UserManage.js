import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createANewUser, deleteUser, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import {emitter} from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           arrUsers: [],
           isOpenModalUser: false,
           isOpenModalEditUser: false,
           userEdit: {},
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

    toggleUserEditModal = () => {
      this.setState({
        isOpenModalEditUser: !this.state.isOpenModalEditUser,
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

          emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'})
        }
      }catch(e) {
        console.log(e)
      }
      
    }

    handleDeleteUser = async (user) => {
      try{
        let response = await deleteUser(user.id);
        if( response && response.errCode === 0) {
          await this.getAllUserFromReact();
        } else {
          alert('response.errMessage')
        }
      } catch(e) {
        console.log(e)
      }
    }
    
    handleEditUser = async (user) => {
      this.setState({
        isOpenModalEditUser: true,
        userEdit: user
      })
    }
    
    doEditUser = async (user) => {
      let response = await editUserService(user)
      try{
        if(response && response.errCode ===0) {
           this.setState({
            isOpenModalEditUser: false
           })
           await this.getAllUserFromReact()
        } else {
          alert(response.errMessage)
        }
      } catch(e) {
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
                {
                  this.state.isOpenModalEditUser &&
                  <ModalEditUser
                   isOpen = {this.state.isOpenModalEditUser}
                   toggleUserEditModal = {this.toggleUserEditModal}
                   currentUser = {this.state.userEdit}
                   editUser = {this.doEditUser}
                  />
                }
                
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
                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
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
