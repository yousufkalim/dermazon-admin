import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
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
} from "reactstrap";
import { Radio } from "antd";
import FilePicker from "components/FilePicker/FilePicker";
// core components

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result.replace(/^.*,/, ""));
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const AddUser = ({ openModal, handleModal, getUsers }) => {
  let [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    availability: true,
    technical_description: "",
    brand: "",
    images: [],
  });
  const [filenames, setFilenames] = useState([]);

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleDelete = (e, index, item) => {
    e.stopPropagation();
    e.preventDefault();
    const deleteFile = product.images.filter((item, ind) => ind !== index);
    const deleteNames = filenames.filter((item, ind) => ind !== index);

    setProduct({ ...product, images: deleteFile });
    setFilenames(deleteNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name === "") {
      return toast.error("Please enter products's name");
    }

    if (product.price === "") {
      return toast.error("Please enter price");
    }
    if (product.availability === "") {
      return toast.error("Availability is required");
    }
    // if (product.brand === '') {
    //   return toast.error('Brand is required');
    // }

    let formData = new FormData();

    for (let key in product) {
      if (key === "images") {
        for (let i = 0; i < Object.keys(product.images).length; i++) {
          formData.append("images", product.images[i]);
        }
      } else {
        formData.append(key, product[key]);
      }
    }

    api("post", "/products", formData).then((res) => {
      toast.success("Product added successfully");
      getUsers();
      handleModal();
    });
  };

  const handleFile = async (e) => {
    const files = e.target?.files;
    setProduct({
      ...product,
      images: [...product.images, ...files],
    });

    // const names = [];
    // for (let i = 0; i < Object.keys(files).length; i++) {
    //   names.push(files[i]?.name);
    // }
    const names = [];
    for (let i = 0; i < Object.keys(files).length; i++) {
      names.push(URL.createObjectURL(e.target?.files[i]));
    }
    setFilenames(names);
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="X" toggle={handleModal}>
          Add a product
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {product.name ? "" : "*"}{" "}
                          </span>
                          Name
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter product's name here"
                          type="text"
                          value={product.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {product.price ? "" : "*"}{" "}
                          </span>
                          Price
                        </label>{" "}
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter product price"
                          type="number"
                          value={product.email}
                          name="price"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          {" "}
                          <span style={{ color: "red" }}>
                            {product.brand ? "" : "*"}{" "}
                          </span>{" "}
                          Brand
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter brand here"
                          type="text"
                          value={product.brand}
                          name="brand"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          <span style={{ color: "red" }}>
                            {product.availability ? "" : "*"}{" "}
                          </span>
                          Availability
                        </label>
                        <div>
                          <Radio.Group
                            name="availability"
                            onChange={handleInput}
                            value={product.availability}
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
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Description
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-password"
                          placeholder="Description"
                          type="text"
                          value={product.description}
                          name="description"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Technical Description
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user's address here"
                          type="text"
                          value={product.technical_description}
                          name="technical_description"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <FilePicker
                        fileName={filenames}
                        accept="image/*"
                        isDelete={true}
                        handleDelete={handleDelete}
                        isMultiple={true}
                        multiple={true}
                        type="file"
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
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddUser;
