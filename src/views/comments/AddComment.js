import { useEffect, useRef, useState } from 'react';
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

const AddComment = ({ openModal, handleModal, getComments }) => {
  const [comment, setComment] = useState({
    userName: '',
    companyName: '',
    comment: '',
  });

  const handleInput = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.userName === '') {
      return toast.error('Please enter user name');
    }

    if (comment.companyName === '') {
      return toast.error('Please enter commpany name');
    }
    if (comment.comment === '') {
      return toast.error('Please enter comment');
    }

    api('post', '/comments', comment).then((res) => {
      toast.success('comment added successfully');
      getComments();
      handleModal();
    });
  };

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Add a comment
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className='pl-lg-4'>
                  <Row>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>{comment.userName ? '' : '*'} </span>
                          User Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter user name here'
                          type='text'
                          value={comment.userName}
                          name='userName'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>{comment.companyName ? '' : '*'} </span>
                          Company Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter company name here'
                          type='text'
                          value={comment.companyName}
                          name='companyName'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>{comment.comment ? '' : '*'} </span>
                          Comment
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Comment'
                          type='textarea'
                          value={comment.comment}
                          name='comment'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddComment;
