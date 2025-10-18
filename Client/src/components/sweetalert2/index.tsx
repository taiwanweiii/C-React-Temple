// sweetalert.ts
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// 通用 alert 函數
const showAlert = (
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question',
    confirmButtonText: string = '確定',
    cancelButtonText?: string
) => {
    return MySwal.fire({
        title,
        text,
        icon,
        showCancelButton: !!cancelButtonText,
        confirmButtonText,
        cancelButtonText,
    });
};
//專門的成功函數
const showSuccess = (text: string, confirmButtonText: string = '確定') => {
    return showAlert('成功', text, 'success', confirmButtonText);
}

// 專門的警告函數
const showWarning = (text: string, confirmButtonText: string = '確定') => {
    return showAlert('警告', text, 'warning', confirmButtonText);
};
// 專門的錯誤函數
const showError = (err: any, componentName?: string) => {
    const isDev = process.env.NODE_ENV === 'development';
    componentName = componentName ?? '尚未填入組件名稱';
    console.error(`錯誤來自: ${componentName}`, err);
    if (isDev) {
        const title = `錯誤 - ${componentName}`;
        showAlert(title, `錯誤訊息: ${err}`, 'error');
    } else {
        showAlert('發生未知錯誤', '請稍後再試', 'error');
    }
};
// 統一匯出物件
const Sweetalert = {
    showAlert,
    showSuccess,
    showWarning,
    showError
};

export default Sweetalert;
