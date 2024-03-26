import Container from "../components/common/Container";
import styles from "./PreferencePage.module.css";
import Nav from "../components/common/Nav";
import Header from "../components/common/Header";
import Box from "../components/common/Box";

export default function PreferencePage() {
  return (
    <Container>
      <Header>PreferencePage</Header>

      <Nav num={1} />
    </Container>
  );
}
