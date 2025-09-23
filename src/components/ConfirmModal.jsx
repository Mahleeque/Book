import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ConfirmModal({
  show,
  title,
  body,
  confirmText,
  confirmVariant,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <div className="card border-0 m-2">
        <div className="card-header border-0 pb-2">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
        <div className="card-body">
          <p className="mb-0">{body}</p>
        </div>
        <div className="card-footer bg-transparent border-0 d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`btn btn-outline-${confirmVariant}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
