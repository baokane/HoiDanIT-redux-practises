import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { createNewBlog, resetBlogCreate } from '../../redux/blog/blog.slide';

function BlogCreateModal(props: any) {
    const { show, setShow } = props;

    const [title, setTilte] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useAppDispatch()
    const isBlogCreateSuccess = useAppSelector(state => state.blog.isBlogCreateSuccess)

    useEffect(() => {
        if (isBlogCreateSuccess === true) {
            setTilte('')
            setAuthor('')
            setContent('')

            // reset redux
            dispatch(resetBlogCreate())
        }
    }, [isBlogCreateSuccess])

    const handleSubmitCreateModal = () => {
        dispatch(createNewBlog({ title, author, content }))
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
                    <form >
                        <div className="mb-3" >
                            <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                onChange={(e) => setTilte(e.target.value)}
                                value={title}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Author</label>
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                onChange={(e) => setAuthor(e.target.value)}
                                value={author}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Content</label>
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                            />
                        </div>
                    </form>
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

export default BlogCreateModal;
