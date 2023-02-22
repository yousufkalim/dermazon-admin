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
import AddUser from './AddUser';
import EditUser from './EditUser';
import Header from 'components/Headers/Header.js';
import { toast } from 'react-toastify';

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { users } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const [product, setProduct] = useState({
    _id: '',
    name: '',
    price: '',
    availability: null,
    description: '',
    frenchDescription:'',
    brand: '',
    technical_description: '',
    frenchTechnicalDescription:'',
    images: [],
    oldImages: [],
  });
  const [filenames, setFilenames] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await api('get', '/products');
    updateStore({ users: data.data.products });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    if (item) {
      let names = [];
      if (item.images) {
        const images = item.images.map((img) => `${process.env.REACT_APP_SERVER_MEDIA_URL}${img}`);
        const imageNames = item.images.map((img) => img?.split('uploads/')[1]);
        setFilenames(images);
        names = imageNames;
      }
      setProduct({
        _id: item._id,
        name: item.name,
        price: item.price,
        availability: item.availability,
        description: item.description,
        frenchDescription:item.frenchDescription,
        brand: item.brand,
        technical_description: item.technical_description,
        frenchTechnicalDescription:item.frenchTechnicalDescription,
        images: [],
        oldImages: names,
      });
    }

    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api('delete', `/products/${id}`).then(() => {
      toast.success('Product deleted successfully');
      getProducts();
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
                  <h3 className='mb-0'>Products</h3>
                  <Button color='primary' href='#pablo' onClick={handleModal} size='md'>
                    <i className='ni ni-fat-add'></i>
                    Add product
                  </Button>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Availability</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Brand</th>
                    <th scope='col'>Technical Description</th>
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
                        <td title={item.price}>{item.price}</td>

                        <td>{item.availability ? 'Yes' : 'No'}</td>
                        <td>{item.description}</td>
                        <td>{item.brand}</td>
                        <td>{item.technical_description}</td>

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

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddUser openModal={openModal} handleModal={handleModal} getUsers={getProducts} />
        )}
        {editModal && (
          <EditUser
            openModal={editModal}
            handleModal={handleEditModal}
            user={product}
            filenames={filenames}
            setFilenames={setFilenames}
            setUser={setProduct}
            getUsers={getProducts}
          />
        )}
      </Container>
    </>
  );
};

export default Products;
