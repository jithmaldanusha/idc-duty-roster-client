import './styles.css';

export function ClearButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="clearbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Clear
            </button>
        </div>
    );
}

export function LoginButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="loginbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Login
            </button>
        </div>
    );
}

export function SubmitButton({ onClick }) {
    return (
        <div className="text-center text-lg-start mt-4 pt-2">
            <button
                type="button"
                className="submitbtn btn btn-lg rounded-5 fs-6 fw-bold me-1"
                onClick={onClick}
            >
                Submit
            </button>
        </div>
    );
}