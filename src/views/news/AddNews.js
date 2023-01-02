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
import { Input as TagInput, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import FilePicker from 'components/FilePicker/FilePicker';

const AddNews = ({ openModal, handleModal, getUsers }) => {
  let [news, setNews] = useState({
    name: '',
    description: '',
    tags: [],
    image: null,
  });

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInput = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (news.name === '') {
      return toast.error('Please enter name');
    }

    if (news.description === '') {
      return toast.error('Please enter description');
    }

    let formData = new FormData();

    for (let key in news) {
      if (key === 'tags') {
        news.tags.forEach((tag) => {
          formData.append('tags[]', tag);
        });
      } else {
        formData.append(key, news[key]);
      }
    }
    api('post', '/news', formData).then((res) => {
      toast.success('News added successfully');
      getUsers();
      handleModal();
    });
  };

  const handleFile = (e) => {
    console.log('Files ', e.target.files[0]);
    setNews({
      ...news,
      image: e.target.files[0],
    });
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);

  const handleClose = (removedTag) => {
    const newTags = news.tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setNews({ ...news, tags: newTags });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && news.tags.indexOf(inputValue) === -1) {
      setNews({ ...news, tags: [...news.tags, inputValue] });
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = news.tags.map(forMap);

  return (
    <>
      <Modal isOpen={openModal} size='xl' centered>
        <ModalHeader charCode='X' toggle={handleModal}>
          Add a news
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
                          <span style={{ color: 'red' }}>{news.name ? '' : '*'} </span>
                          Name
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Enter name here'
                          type='text'
                          value={news.name}
                          name='name'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg='6' style={{ margin: 'auto' }}>
                      <label style={{ display: 'block' }} className='form-control-label'>
                        Tags
                      </label>
                      {inputVisible && (
                        <TagInput
                          ref={inputRef}
                          type='text'
                          size='small'
                          style={{ width: 78, marginBottom: 10 }}
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputConfirm}
                          onPressEnter={handleInputConfirm}
                        />
                      )}
                      {!inputVisible && (
                        <Tag
                          style={{ marginBottom: 10 }}
                          onClick={showInput}
                          className='site-tag-plus'
                        >
                          <PlusOutlined /> New Tag
                        </Tag>
                      )}
                      <div style={{ marginBottom: 16 }}>
                        <TweenOneGroup
                          enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                          }}
                          onEnd={(e) => {
                            if (e.type === 'appear' || e.type === 'enter') {
                              e.target.style = 'display: inline-block';
                            }
                          }}
                          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                          appear={false}
                        >
                          {tagChild}
                        </TweenOneGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12' style={{ margin: 'auto' }}>
                      <FormGroup>
                        <label className='form-control-label'>
                          {' '}
                          <span style={{ color: 'red' }}>{news.description ? '' : '*'} </span>
                          Description
                        </label>{' '}
                        <Input
                          className='form-control-alternative text-default'
                          required={true}
                          placeholder='Description'
                          type='text'
                          value={news.email}
                          name='description'
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6'>
                      <FilePicker
                        accept='image/x-png,image/gif,image/jpeg'
                        type='file'
                        fileName={news?.image && URL.createObjectURL(news?.image)}
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
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddNews;
