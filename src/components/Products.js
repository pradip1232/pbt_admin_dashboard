import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col, Row, Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Products = () => {
    const [open, setOpen] = useState(false);
    const [productId] = useState(`PROD-${Math.floor(10000000 + Math.random() * 90000000)}`);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [entities, setEntities] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]); // State to hold fetched products

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost/pbt/get_products.php'); // Adjust the API endpoint
            if (response.ok) {
                const data = await response.json();
                // console.log("data", data);
                setProducts(data.data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setCategory('');
        setDescription('');
        setEntities('');
        setStartDate('');
        setExpireDate('');
        setImages([]);
    };

    const handleImageChange = (event) => {
        setImages(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', productId);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('entities', entities);
        formData.append('startDate', startDate);
        formData.append('expireDate', expireDate);
        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost/pbt/upload_products.php', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Product added successfully!');
                handleClose();
                fetchProducts(); // Refresh the product list after adding a new product
            } else {
                const errorData = await response.json();
                alert(`Failed to add product: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleOpen}>
                Add New Product
            </Button>
            <Modal show={open} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group controlId="productId">
                                    <Form.Label>Product ID</Form.Label>
                                    <Form.Control type="text" value={productId} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group controlId="productName">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                        <option value="">Select...</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Food">Food</option>
                                        <option value="Books">Books</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="entities">
                                    <Form.Label>Entities</Form.Label>
                                    <Form.Control type="text" value={entities} onChange={(e) => setEntities(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group controlId="expireDate">
                                    <Form.Label>Expire Date</Form.Label>
                                    <Form.Control type="date" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="images">
                                    <Form.Label>Upload Images</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="images"
                                        onChange={handleImageChange}
                                        multiple
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Displaying all uploaded products in a table */}
            <h2 className="mt-4">Uploaded Products</h2>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Entities</th>
                        <th>Start Date</th>
                        <th>Expire Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(products) && products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.description}</td>
                            <td>{product.entities}</td>
                            <td>{product.startDate}</td>
                            <td>{product.expireDate}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>
    );
};

export default Products;