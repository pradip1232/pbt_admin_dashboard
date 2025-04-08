import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Modal, Row, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const [showWebinarModal, setShowWebinarModal] = useState(false);
    const [showPublicationModal, setShowPublicationModal] = useState(false);

    const [webinarData, setWebinarData] = useState({ linkURL: '', buttonName: '', datetime: '' });
    const [publicationData, setPublicationData] = useState({ linkURL: '', buttonName: '', datetime: '' });

    const [submittedLinks, setSubmittedLinks] = useState([]);

    useEffect(() => {
        fetchSubmittedLinks();
    }, []);

    const fetchSubmittedLinks = async () => {
        try {
            const response = await fetch('http://localhost/pbt/get-all-webinars.php');
            const result = await response.json();
            if (result.success && result.data) {
                setSubmittedLinks(result.data);
            }
        } catch (error) {
            console.error('Error fetching webinars:', error);
        }
    };

    const handleWebinarSubmit = async (e) => {
        e.preventDefault();
        const { linkURL, buttonName, datetime } = webinarData;
        if (!linkURL.trim() || !buttonName.trim() || !datetime.trim()) return;

        try {
            const formData = new FormData();
            formData.append('linkURL', linkURL);
            formData.append('buttonName', buttonName);
            formData.append('datetime', datetime);

            const response = await fetch('http://localhost/pbt/save-webinar.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setSubmittedLinks(prev => [...prev, result.data]);
                toast.success('✅ ' + result.message);
                setShowWebinarModal(false);
                setWebinarData({ linkURL: '', buttonName: '', datetime: '' });
            } else {
                toast.error('❌ ' + result.message);
            }
        } catch (err) {
            toast.error('❌ Server error!');
            console.error(err);
        }
    };

    const handlePublicationSubmit = async (e) => {
        e.preventDefault();
        const { linkURL, buttonName, datetime } = publicationData;
        if (!linkURL.trim() || !buttonName.trim() || !datetime.trim()) return;

        try {
            const formData = new FormData();
            formData.append('linkURL', linkURL);
            formData.append('buttonName', buttonName);
            formData.append('datetime', datetime);

            const response = await fetch('http://localhost/pbt/save-publication.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                toast.success('✅ ' + result.message);
                setShowPublicationModal(false);
                setPublicationData({ linkURL: '', buttonName: '', datetime: '' });
            } else {
                toast.error('❌ ' + result.message);
            }
        } catch (err) {
            toast.error('❌ Server error!');
            console.error(err);
        }
    };

    const renderModal = (type) => {
        const isWebinar = type === 'webinar';
        const showModal = isWebinar ? showWebinarModal : showPublicationModal;
        const handleClose = () => isWebinar ? setShowWebinarModal(false) : setShowPublicationModal(false);
        const handleSubmit = isWebinar ? handleWebinarSubmit : handlePublicationSubmit;
        const formData = isWebinar ? webinarData : publicationData;
        const setFormData = isWebinar ? setWebinarData : setPublicationData;

        return (
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New {isWebinar ? 'Webinar' : 'Publication'} Link</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder={`Enter ${isWebinar ? 'webinar' : 'publication'} link`}
                                value={formData.linkURL}
                                onChange={(e) => setFormData({ ...formData, linkURL: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Button Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., Join Now"
                                value={formData.buttonName}
                                onChange={(e) => setFormData({ ...formData, buttonName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date & Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={formData.datetime}
                                onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    };

    return (
        <section className="py-5">
            <Container>
                <Row className="justify-content-center mt-4 pt-4">
                    <Col md={10}>
                        <Card className="shadow border-0">
                            <Card.Header className="bg-primary text-white">1. Join Our Interactive Webinars Section</Card.Header>
                            <Card.Body>
                                <Card.Text>Uploaded webinar links:</Card.Text>
                                {submittedLinks.length > 0 ? (
                                    <ul className="mt-3">
                                        {submittedLinks.map((item, idx) => (
                                            <li key={idx}>
                                                <a href={item.linkURL} target="_blank" rel="noopener noreferrer">
                                                    {item.buttonName || 'Join Now'} - {item.datetime}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted">No webinar links added yet.</p>
                                )}
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                <small className="text-muted">Last updated just now</small>
                                <Button variant="outline-primary" onClick={() => setShowWebinarModal(true)}>
                                    Add Webinar
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-4">
                    <Col md={10}>
                        <Card className="shadow border-0">
                            <Card.Header className="bg-success text-white">2. Digital Publication Section</Card.Header>
                            <Card.Body>
                                <Card.Text>This is where your digital publication links go.</Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                <small className="text-muted">Last updated just now</small>
                                <Button variant="outline-success" onClick={() => setShowPublicationModal(true)}>
                                    Add Publication
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {renderModal('webinar')}
            {renderModal('publication')}
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </section>
    );
};

export default Update;
