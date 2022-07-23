import React from "react";


function ConfirmDeletePopup({ isOpen, onClose, onSubmit, card, onLoading }) {

    const handleConfirmiation = (event) => {
        event.preventDefault();
        onSubmit(card);
    };


    return (

        <div className={`popup popup_type_confirm ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button
                    className="popup__close-button popup__close-button_place_confirm"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title popup__title_place_confirm">Вы уверены?</h2>
                <form
                    id="confirm-delete-popup"
                    name="popup"
                    action="/apply/"
                    method="POST"
                    className="popup__form popup__form_type_confirm"
                    noValidate
                    onSubmit={handleConfirmiation}
                >
                    <button
                        type="submit"
                        className="popup__form-button popup__form-button_action_confirm"
                    >
                        {onLoading ? 'Скоро...' : 'Да'}
                    </button>
                </form>
            </div>
        </div>

    );
}

export default ConfirmDeletePopup;