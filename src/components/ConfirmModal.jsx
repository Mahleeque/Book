
import React, { useEffect, useRef } from 'react'  


export default function ConfirmModal({  
  show,  
  title = 'Confirm',  
  body = 'Are you sure?',  
  confirmText = 'Confirm',  
  cancelText = 'Cancel',  
  onConfirm = () => {},  
  onCancel = () => {},  
  confirmVariant = 'danger',  
  ariaLabelId = 'confirmModalLabel',  
}) {  
  const confirmBtnRef = useRef(null)  
  const previouslyFocusedRef = useRef(null)  

    
  useEffect(() => {  
    if (show) {  
      previouslyFocusedRef.current = document.activeElement  

     
      document.body.classList.add('modal-open')  

   
      const backdrop = document.createElement('div')  
      backdrop.className = 'modal-backdrop fade show'  
      backdrop.setAttribute('data-confirm-modal-backdrop', 'true')  
      document.body.appendChild(backdrop)  
    } else {  
     
      document.body.classList.remove('modal-open')  
      const existing = document.querySelector('[data-confirm-modal-backdrop="true"]')  
      if (existing) existing.remove()  

     
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {  
        try {  
          previouslyFocusedRef.current.focus()  
        } catch (e) {  
           
        }  
      }  
    }  

    
    return () => {  
      document.body.classList.remove('modal-open')  
      const existing = document.querySelector('[data-confirm-modal-backdrop="true"]')  
      if (existing) existing.remove()  
    }  
  }, [show])  


  useEffect(() => {  
    if (!show) return undefined  

    const handleKey = (e) => {  
      if (e.key === 'Escape') {  
        e.preventDefault()  
        onCancel()  
      } else if (e.key === 'Enter') {  
        const active = document.activeElement  
       
        if (active && (active.tagName === 'TEXTAREA' || active.isContentEditable)) {  
          return  
        }  
        e.preventDefault()  
        onConfirm()  
      }  
    }  

    window.addEventListener('keydown', handleKey)  
    return () => window.removeEventListener('keydown', handleKey)  
  }, [show, onCancel, onConfirm])  

  
  useEffect(() => {  
    if (show && confirmBtnRef.current) {  
      try {  
        confirmBtnRef.current.focus()  
      } catch (e) {  
         
      }  
    }  
  }, [show])  

  if (!show) return null  

  return (
    <div
      className="modal fade show"
      style={{ display: 'block' }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelId}
      onClick={onCancel}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <div className="d-flex align-items-center">
              <div className={`rounded-circle p-2 me-3 ${confirmVariant === 'danger' ? 'bg-danger bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
                <i className={`bi ${confirmVariant === 'danger' ? 'bi-exclamation-triangle text-danger' : 'bi-question-circle text-warning'} fs-4`}></i>
              </div>
              <h5 className="modal-title fw-bold mb-0" id={ariaLabelId}>
                {title}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCancel}
            />
          </div>
          <div className="modal-body pt-2 pb-4">
            <div className="ms-5">
              <p className="mb-0 text-muted">{body}</p>
            </div>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              <i className="bi bi-x-circle me-2"></i>
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn btn-${confirmVariant}`}
              ref={confirmBtnRef}
              onClick={onConfirm}
            >
              <i className={`bi ${confirmVariant === 'danger' ? 'bi-trash' : 'bi-check-circle'} me-2`}></i>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}