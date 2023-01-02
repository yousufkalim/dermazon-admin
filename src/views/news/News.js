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
import AddUser from './AddNews';
import EditUser from './EditNews';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const News = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { users } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [product, setProduct] = useState({
    _id: '',
    name: '',
    tags: [],
    description: '',
    image: null,
  });

  const [imageName, setImageName] = useState('');

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const data = await api('get', '/news');

    updateStore({ users: data.data.news });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      setProduct({
        _id: item._id,
        name: item.name,
        tags: item.tags,
        description: item.description,
        image: item?.image,
      });
      setImageName(item?.image ? `${process.env.REACT_APP_SERVER_MEDIA_URL}${item?.image}` : '');
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api('delete', `/news/${id}`).then(() => {
      toast.success('News deleted successfully');
      getNews();
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
                  <h3 className='mb-0'>News</h3>
                  <Button color='primary' href='#pablo' onClick={handleModal} size='md'>
                    <i className='ni ni-fat-add'></i>
                    Add News
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Tags</th>
                    <th scope='col'>Description</th>
                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.name}>
                                {item.name?.length > 30
                                  ? item.name?.substring(0, 30) + '...'
                                  : item.name}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td>
                          {item?.tags?.map((tag, ind) => (
                            <span key={ind}>
                              {tag} {ind !== item?.tags?.length - 1 && ','}
                            </span>
                          ))}
                        </td>
                        <td title={item.description}>{item.description}</td>

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
          <AddUser openModal={openModal} handleModal={handleModal} getUsers={getNews} />
        )}
        {editModal && (
          <EditUser
            openModal={editModal}
            setImageName={setImageName}
            imageName={imageName}
            handleModal={handleEditModal}
            news={product}
            setNews={setProduct}
            getUsers={getNews}
          />
        )}
      </Container>
    </>
  );
};

export default News;
