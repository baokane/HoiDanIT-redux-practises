import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { createNewBlog, deleteBlog, resetBlogCreate } from '../../redux/blog/blog.slide';

function BlogDeleteModal(props: any) {
    const { show, setShow, dataBlogDelete } = props;

    const [title, setTilte] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useAppDispatch()
    const isBlogDeleteSucsess = useAppSelector(state => state.blog.isBlogDeleteSucsess)

    useEffect(() => {
        if (isBlogDeleteSucsess === true) {
            setTilte('')
            setAuthor('')
            setContent('')

            // reset redux
            dispatch(resetBlogCreate())
        }
    }, [isBlogDeleteSucsess])

    const handleSubmitCreateModal = () => {
        dispatch(deleteBlog({ id: dataBlogDelete?.id }))
        setShow(false)
        console.log('title:', title, 'author:', author, 'content:', content)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure delete email <b>{dataBlogDelete?.title}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreateModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BlogDeleteModal;
