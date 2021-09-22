import { notification } from 'antd';

const showNotification = ({ title, message, className }) => notification.open({
    className,
    message: title,
    description: message,
    duration: 5
});

export default showNotification ;
