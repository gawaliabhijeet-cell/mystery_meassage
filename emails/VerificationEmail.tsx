import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Body,
  Container,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'Roboto, Verdana, sans-serif' }}>
        <Container
          style={{
            backgroundColor: '#ffffff',
            margin: '0 auto',
            padding: '32px',
            borderRadius: '8px',
            maxWidth: '480px',
          }}
        >
          <Section>
            <Row>
              <Heading as="h2">Hello {username},</Heading>
            </Row>
            <Row>
              <Text>
                Thank you for registering. Please use the following verification
                code to complete your registration:
              </Text>
            </Row>
            <Row>
              <Text
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  letterSpacing: '8px',
                  textAlign: 'center',
                  backgroundColor: '#f4f4f5',
                  padding: '16px',
                  borderRadius: '6px',
                  margin: '16px 0',
                }}
              >
                {otp}
              </Text>
            </Row>
            <Row>
              <Text style={{ color: '#71717a', fontSize: '14px' }}>
                This code will expire in 10 minutes. If you did not request this
                code, you can safely ignore this email.
              </Text>
            </Row>
            {/* Uncomment once the verify link is ready, and move the URL to an env var
            <Row>
              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL}/verify/${username}`}
                style={{
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                Verify here
              </Button>
            </Row>
            */}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}