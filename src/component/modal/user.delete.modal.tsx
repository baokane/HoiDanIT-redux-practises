import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { deleteUser, resetDelete } from '../../redux/user/user.slide';

const UserDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const dispatch = useAppDispatch()

    const isDeleteSuccess = useAppSelector(state => state.user.isDeleteSuccess)

    useEffect(() => {
        if (isDeleteSuccess === true) {
            dispatch(resetDelete())
        }
    }, [isDeleteSuccess])

    const handleSubmit = () => {
        console.log(">>> check delete: ", { id: dataUser?.id ?? "" })

        dispatch(deleteUser({ id: dataUser?.id }))

        setIsOpenDeleteModal(false)
    }

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='warning'
                    onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;