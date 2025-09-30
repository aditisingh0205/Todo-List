import styles from './Heading.module.css';
function Heading({children,font}){
return (<h1 style={{ fontFamily: font }} className={styles.heading}>{children}</h1>
)}

export default Heading;