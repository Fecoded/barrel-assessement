

import { Container, FlexColumn, Header, Paragraph, Spacer } from "@src/styles"

type LayoutProps = {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const Layout = ({title, description, children}: LayoutProps) => {
    return (
         <Container>
            <Spacer size="20px" />
            <FlexColumn>
                <Header $center>{title}</Header>
                <Paragraph $center>{description}</Paragraph>
                <Spacer size="30px" />
                {children}
            </FlexColumn>
         </Container>
    )
}