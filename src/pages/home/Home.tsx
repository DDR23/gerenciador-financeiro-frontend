import { Button, Group, Image, Text, Title } from "@mantine/core";
import "./index.scss"

export default function Home() {

  return (
    <>
      <div className="home" >
        <div className="home__content" >
          <Image src='coin.png' />
          <Title order={1}><Text span c="green" inherit>Organize</Text> suas finanças com facilidade</Title>
          <Title order={2}>Gerencie suas contas, receitas e despesas de forma simples e intuitiva. <Text span c="green" inherit fw='bold'>Fique no controle do seu dinheiro.</Text></Title>
          <Group className="home__content--btn">
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'green', deg: 90 }}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
            >
              Criar conta
            </Button>
          </Group>
        </div>
      </div>
    </>
  );
}