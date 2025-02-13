import { ComponentProps } from "react";

type SvgProps = ComponentProps<"svg">
export const SearchIcon = ({...props}:SvgProps) => {
	return (
		<svg
    {...props}
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="21"
			viewBox="0 0 20 21"
			fill="none"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.37374 3.41687C6.01928 3.41687 3.29996 6.13619 3.29996 9.49067C3.29996 12.8451 6.01928 15.5644 9.37374 15.5644C12.7282 15.5644 15.4475 12.8451 15.4475 9.49067C15.4475 6.13619 12.7282 3.41687 9.37374 3.41687ZM2.04996 9.49067C2.04996 5.44585 5.32892 2.16687 9.37374 2.16687C13.4186 2.16687 16.6975 5.44585 16.6975 9.49067C16.6975 13.5355 13.4186 16.8144 9.37374 16.8144C5.32892 16.8144 2.04996 13.5355 2.04996 9.49067Z"
				fill="#717784"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.9466 13.5397L18.6262 18.2072L17.7434 19.0922L13.0638 14.4247L13.9466 13.5397Z"
				fill="#717784"
			/>
		</svg>
	);
};
