/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from 'api';
import { Store, UpdateStore } from 'StoreContext';
import {
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from 'reactstrap';

// core components
import AddComment from './AddComment';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';
import EditComments from './EditComments';

const Comments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { comments } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [comment, setComment] = useState({
    _id: '',
    userName: '',
    companyName: '',
    comment: '',
  });

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const data = await api('get', '/comments');

    updateStore({ comments: data.data.comments });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setComment({
        _id: item._id,
        userName: item.userName,
        companyName: item.companyName,
        comment: item.comment,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api('delete', `/comments/${id}`).then(() => {
      toast.success('Comment deleted successfully');
      getComments();
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>Comments</h3>
                  <Button color='primary' href='#pablo' onClick={handleModal} size='md'>
                    <i className='ni ni-fat-add'></i>
                    Add Comment
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>User Name</th>
                    <th scope='col'>Company Name</th>
                    <th scope='col'>Comment</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {comments?.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.userName}>
                                {item.userName?.length > 30
                                  ? item.userName?.substring(0, 30) + '...'
                                  : item.userName}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.companyName}>
                                {item.companyName?.length > 30
                                  ? item.companyName?.substring(0, 30) + '...'
                                  : item.companyName}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td title={item.comment}>{item.comment}</td>

                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              href='#pablo'
                              role='button'
                              size='sm'
                              color=''
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              {item.test_conducted && (
                                <DropdownItem
                                  onClick={() => history.push(`/admin/products/${item._id}`)}
                                >
                                  View
                                </DropdownItem>
                              )}
                              <DropdownItem href='#pablo' onClick={() => handleEditModal(item)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href='#pablo'
                                className='text-danger'
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddComment openModal={openModal} handleModal={handleModal} getComments={getComments} />
        )}
        {editModal && (
          <EditComments
            openModal={editModal}
            handleModal={handleEditModal}
            comment={comment}
            setComment={setComment}
            getComments={getComments}
          />
        )}
      </Container>
    </>
  );
};

export default Comments;
