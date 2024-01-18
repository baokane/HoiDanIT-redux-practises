import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { useEffect, useState } from 'react';
import { fetchBlog } from '../../redux/blog/blog.slide';
import BlogCreateModal from './blog.create';
import BlogUpdateModal from './blog.update';
import BlogDeleteModal from './blog.delete';

function BlogTable() {

    const [showBlogCreateModal, setShowBlogCreateModal] = useState(false)
    const [showBlogUpdateModal, setShowBlogUpdateModal] = useState(false)
    const [showBlogDeleteModal, setShowBlogDeleteModal] = useState(false)
    const [dataBlogUpdate, setDataBlogUpdate] = useState({})
    const [dataBlogDelete, setDataBlogDelete] = useState({})

    const dispatch = useAppDispatch()

    const dataBlog = useAppSelector(state => state.blog.listBlog)

    useEffect(() => {
        dispatch(fetchBlog())
    }, [])

    const handleBlogUpdate = (dataUpdate: any) => {
        setDataBlogUpdate(dataUpdate)
        setShowBlogUpdateModal(true)
    }

    const handleBlogDelete = (dataDelete: any) => {
        setShowBlogDeleteModal(true)
        setDataBlogDelete(dataDelete)
    }

    return (<>

        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4>Table Blog</h4>
            <button className='btn btn-primary' onClick={() => setShowBlogCreateModal(true)}>Add New Blog</button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {dataBlog && dataBlog.length > 0 && dataBlog.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.content}</td>
                            <td>
                                <span>
                                    <button className='btn btn-success' onClick={() => handleBlogUpdate(item)}>UPDATE</button>
                                    <button className='btn btn-warning' onClick={() => handleBlogDelete(item)}>DELETE</button>
                                </span>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <BlogCreateModal show={showBlogCreateModal} setShow={setShowBlogCreateModal} />
        <BlogUpdateModal show={showBlogUpdateModal} setShow={setShowBlogUpdateModal} dataBlogUpdate={dataBlogUpdate} />
        <BlogDeleteModal show={showBlogDeleteModal} setShow={setShowBlogDeleteModal} dataBlogDelete={dataBlogDelete} />
    </>
    );
}

export default BlogTable;