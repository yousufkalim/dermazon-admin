import { toast } from 'react-toastify';
import api from '../../api';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { Radio } from 'antd';
import FilePicker from 'components/FilePicker/FilePicker';

// core components

const EditUser = ({ openModal, handleModal, user, setUser, getUsers, filenames, setFilenames }) => {
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.name === '') {
      return toast.error("Please enter products's name");
    }

    if (user.price === '') {
      return toast.error('Please enter price');
    }
    if (user.availability === '') {
      return toast.error('Availability is required');
    }
    if (user.brand === '') {
      return toast.error('Brand is required');
    }

    let formData = new FormData();

    for (let key in user) {
      if (key === 'images') {
        for (let i = 0; i < Object.keys(user.images).length; i++) {
          formData.append('images', user.images[i]);
        }
      }
      if (key === 'oldImages') {
        user.oldImages?.forEach((img) => {
          formData.append('oldImages', img);
        });
      } else {
        formData.append(key, user[key]);
      }
    }

    for (let i = 0; i < user.images.length; i++) {}

    api('patch', `/products/${user._id}`, formData).then((res) => {
      toast.success('Product edited successfully');
      getUsers();
      handleModal();
    });
  };

  const handleFile = (e) => {
    e.stopPropagation();
    const files = e.target?.files;
    setUser({
      ...user,
      images: [...user?.images, ...files],
    });
    const names = [];
    const images = [];
    for (let i = 0; i < Object.keys(files).length; i++) {
      names.push(files[i]?.name);
      images.push(URL.createObjectURL(e.target?.files[i]));
    }
    setFilenames([...filenames, ...images]);
  };

  const handleDelete = (e, index, item) => {
    e.stopPropagation();
    e.preventDefault();
    const deleteFile = user.images.filter((item, ind) => ind !== index);
    const deleteNames = filenames.filter((item, ind) => ind !== index);
    const deleteOldImages = user?.oldImages?.filter((img, ind) => ind !== index);

    setUser({ ...user, images: deleteFile, oldImages: deleteOldImages });
    setFilenames(deleteNames);
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Edit a product
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.name ? '' : '*'} </span>
                        <label className='form-control-label'>Name</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter user's name here"
                          type='text'
                          value={user.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <span style={{ color: 'red' }}>{user.price ? '' : '*'} </span>
                        <label className='form-control-label'>Price</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter product's price here"
                          type='number'
                          value={user.price}
                          name='price'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>Brand</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder="Enter product's brand here"
                          type='text'
                          value={user.brand}
                          name='brand'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          <span style={{ color: 'red' }}>{user.availability ? '' : '*'} </span>
                          Availability
                        </label>
                        <div>
                          <Radio.Group
                            name='availability'
                            onChange={handleInput}
                            value={user.availability}
                          >
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <FormGroup>
                        <label className='form-control-label' htmlFor='input-password'>
                          Description
                        </label>
                        <Input
                          className='form-control-alternative'
                          id='input-password'
                          placeholder='Description'
                          type='text'
                          value={user.description}
                          name='description'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>Technical Description</label>
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter technical description here'
                          type='text'
                          value={user.technical_description}
                          name='address'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <FilePicker
                        fileName={filenames}
                        isDelete={true}
                        handleDelete={handleDelete}
                        accept='image/*'
                        isMultiple={true}
                        multiple={true}
                        type='file'
                        onChange={handleFile}
                      />
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditUser;
