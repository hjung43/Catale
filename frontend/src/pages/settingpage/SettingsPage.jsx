import Container from "../../components/common/Container";
import Header from "../../components/common/Header";
import Nav from "../../components/common/Nav";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  return (
    <Container>
      <Header>설정</Header>
      <Nav num={5} />
    </Container>
  );
}
