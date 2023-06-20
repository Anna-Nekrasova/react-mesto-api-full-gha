import iconYes from '../images/yes.svg';
import iconNo from '../images/no.svg';

function InfoToolTip({ isOpen, onClose, registrationInfo, isSuccess }) {
    const icon = isSuccess ? iconYes : iconNo;
    return (
            <div className={`popup popup_type_info ${isOpen && 'popup_opened'}`}>
                <div className="popup__body">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <img className="popup__icon" src={icon} alt='иконка' />
                    <p className="popup__info">{registrationInfo}</p>
                </div>
            </div>
    )
}

export default InfoToolTip;