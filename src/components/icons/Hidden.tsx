import { ComponentProps } from "react";

export const Hidden = ({...props}:ComponentProps<"svg">) => {
	return (
		<svg
    {...props}
			width="20"
			height="21"
			viewBox="0 0 20 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.0023 8.92888C8.89243 8.92888 7.99236 9.7924 7.99236 10.8585C7.99236 11.9239 8.89251 12.7881 10.0023 12.7881C11.1122 12.7881 12.0123 11.9239 12.0123 10.8585C12.0123 9.7924 11.1123 8.92888 10.0023 8.92888ZM6.74236 10.8585C6.74236 9.12936 8.20231 7.72888 10.0023 7.72888C11.8024 7.72888 13.2623 9.12936 13.2623 10.8585C13.2623 12.5866 11.8025 13.9881 10.0023 13.9881C8.20218 13.9881 6.74236 12.5866 6.74236 10.8585Z"
				fill="#717784"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.14628 6.49548C5.64161 5.28181 7.70895 4.41687 10.0016 4.41687C12.2939 4.41687 14.3612 5.28113 15.8566 6.49451C17.3359 7.69468 18.3366 9.30808 18.3366 10.8585C18.3366 12.4089 17.3359 14.0222 15.8566 15.2224C14.3612 16.4358 12.2939 17.3001 10.0016 17.3001C7.70895 17.3001 5.64161 16.4351 4.14628 15.2214C2.6673 14.021 1.66667 12.4077 1.66667 10.8585C1.66667 9.30928 2.6673 7.69588 4.14628 6.49548ZM4.95332 7.41186C3.64189 8.47626 2.91667 9.78368 2.91667 10.8585C2.91667 11.9333 3.64189 13.2406 4.95332 14.3051C6.2484 15.3562 8.03606 16.1001 10.0016 16.1001C11.967 16.1001 13.7546 15.3567 15.0498 14.3059C16.3612 13.2418 17.0866 11.9345 17.0866 10.8585C17.0866 9.78248 16.3612 8.47506 15.0498 7.41102C13.7546 6.3602 11.967 5.61687 10.0016 5.61687C8.03606 5.61687 6.2484 6.36073 4.95332 7.41186Z"
				fill="#717784"
			/>
		</svg>
	);
};
