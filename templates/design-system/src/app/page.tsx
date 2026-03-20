import styles from "./style.module.scss";

/**
 * @description
 * 루트 페이지 - 애플리케이션의 진입점입니다.
 */
const HomePage = () => {
	return (
		<div className={styles.home_page}>
			<h1>Welcome to Bigtablet</h1>
			<p>Your application is ready to use.</p>
		</div>
	);
};

export default HomePage;
