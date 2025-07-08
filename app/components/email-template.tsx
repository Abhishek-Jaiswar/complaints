import {
    Body,
    Column,
    Container,
    Head,
    Hr,
    Html,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';

interface ComplaintEmailProps {
    mode: 'created' | 'updated';
    title: string;
    description: string;
    adminReplyTitle?: string;
    adminReplyDescription?: string;
    category: string;
    priority: string;
    status: string;
    userEmail: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export const ComplaintNotificationEmail = ({
    mode,
    title,
    description,
    adminReplyTitle,
    adminReplyDescription,
    category,
    priority,
    status,
    userEmail,
}: ComplaintEmailProps) => {
    const isCreated = mode === 'created';

    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>
                    {isCreated ? 'New Complaint Received' : 'Complaint Updated'} - {title}
                </Preview>

                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Row>
                            <Column>
                                <Text style={headerTitle}>
                                    {isCreated ? 'New Complaint Raised' : 'Complaint Updated'}
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    {/* Priority Banner */}
                    <Section style={getPriorityBanner(priority)}>
                        <Text style={priorityText}>🚨 {priority.toUpperCase()} PRIORITY</Text>
                    </Section>

                    {/* Intro */}
                    <Section style={content}>
                        <Text style={mainHeading}>
                            {isCreated
                                ? 'A new complaint has been raised'
                                : 'Your complaint has been updated'}
                        </Text>
                        <Text style={introText}>
                            {isCreated
                                ? 'Please check the details below and take the necessary action.'
                                : 'The admin has added a reply or updated the status. See the details below.'}
                        </Text>

                        <Hr style={hr} />

                        {/* Complaint Details */}
                        <Section style={detailsSection}>
                            <Text style={sectionTitle}>Complaint Details</Text>

                            <Row style={detailRow}>
                                <Column style={labelColumn}>
                                    <Text style={label}>Title:</Text>
                                </Column>
                                <Column style={valueColumn}>
                                    <Text style={value}>{title}</Text>
                                </Column>
                            </Row>

                            <Row style={detailRow}>
                                <Column style={labelColumn}>
                                    <Text style={label}>Category:</Text>
                                </Column>
                                <Column style={valueColumn}>
                                    <div style={getCategoryBadge()}>
                                        <Text style={badgeText}>{category}</Text>
                                    </div>
                                </Column>
                            </Row>

                            <Row style={detailRow}>
                                <Column style={labelColumn}>
                                    <Text style={label}>Priority:</Text>
                                </Column>
                                <Column style={valueColumn}>
                                    <div style={getPriorityBadge(priority)}>
                                        <Text style={badgeText}>{priority}</Text>
                                    </div>
                                </Column>
                            </Row>

                            <Row style={detailRow}>
                                <Column style={labelColumn}>
                                    <Text style={label}>Status:</Text>
                                </Column>
                                <Column style={valueColumn}>
                                    <div style={getStatusBadge(status)}>
                                        <Text style={badgeText}>{status}</Text>
                                    </div>
                                </Column>
                            </Row>

                            <Row style={detailRow}>
                                <Column style={labelColumn}>
                                    <Text style={label}>User Email:</Text>
                                </Column>
                                <Column style={valueColumn}>
                                    <Link href={`mailto:${userEmail}`} style={emailLink}>
                                        {userEmail}
                                    </Link>
                                </Column>
                            </Row>
                        </Section>

                        <Hr style={hr} />

                        <Section style={descriptionSection}>
                            <Text style={sectionTitle}>Your Complaint</Text>
                            <div style={descriptionBox}>
                                <Text style={descriptionText}>{description}</Text>
                            </div>
                        </Section>

                        {!isCreated && (adminReplyTitle || adminReplyDescription) && (
                            <Section style={descriptionSection}>
                                <Text style={sectionTitle}>Replies</Text>
                                <div style={descriptionBox}>
                                    {adminReplyTitle && (
                                        <>
                                            <Text style={descriptionText}>{adminReplyTitle}</Text>
                                            <Hr style={hr} />
                                        </>
                                    )}
                                    {adminReplyDescription && (
                                        <Text style={descriptionText}>{adminReplyDescription}</Text>
                                    )}
                                </div>
                            </Section>
                        )}


                        <Hr style={hr} />

                        <Section style={actionSection}>
                            <Text style={sectionTitle}>Quick Actions</Text>
                            {mode === "updated" ? (
                                <Row>
                                    <Column style={buttonColumn}>
                                        <Link href={`${baseUrl}/raise-complaint`} style={secondaryButton}>
                                            <Text style={secondaryButtonText}>Track Complaint</Text>
                                        </Link>
                                    </Column>
                                </Row>
                            ) : (


                                <Row>
                                    <Column style={buttonColumn}>
                                        <Link href={`${baseUrl}/admin`} style={primaryButton}>
                                            <Text style={primaryButtonText}>Open Dashboard</Text>
                                        </Link>
                                    </Column>
                                    <Column style={buttonColumn}>
                                        <Link href={`mailto:${userEmail}`} style={secondaryButton}>
                                            <Text style={secondaryButtonText}>Reply to User</Text>
                                        </Link>
                                    </Column>
                                </Row>
                            )}

                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={footerHr} />
                        <Text style={footerText}>
                            This is an automated notification from Complaint.
                        </Text>
                        <Text style={footerSubtext}>
                            &copy; 2025 Comlaint. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const getPriorityBanner = (priority: string) => {
    const colors = {
        High: '#dc2626',
        Medium: '#f59e0b',
        Low: '#10b981',
    };
    return {
        ...priorityBanner,
        backgroundColor: colors[priority as keyof typeof colors] || colors.Medium,
    };
};

const getPriorityBadge = (priority: string) => {
    const colors = {
        High: '#fee2e2',
        Medium: '#fef3c7',
        Low: '#d1fae5',
    };

    const textColors = {
        High: '#991b1b',
        Medium: '#92400e',
        Low: '#065f46',
    };

    return {
        ...badge,
        backgroundColor: colors[priority as keyof typeof colors] || '#fef3c7',
        color: textColors[priority as keyof typeof textColors] || '#92400e',
    };
};

const getCategoryBadge = () => ({
    ...badge,
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
});

const getStatusBadge = (status: string) => {
    const colors = {
        Pending: '#dbeafe',
        'In Progress': '#fef3c7',
        Resolved: '#d1fae5',
        Closed: '#f3f4f6',
    };

    const textColors = {
        Pending: '#1e40af',
        'In Progress': '#92400e',
        Resolved: '#065f46',
        Closed: '#374151',
    };

    return {
        ...badge,
        backgroundColor: colors[status as keyof typeof colors] || '#dbeafe',
        color: textColors[status as keyof typeof textColors] || '#1e40af',
    };
};

export default ComplaintNotificationEmail;

// ✅ Keep all your style objects here — same as before!


// Styles
const main = {
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    padding: '20px 0',
};

const container = {
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '600px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const header = {
    backgroundColor: '#1e293b',
    padding: '24px 32px',
    color: '#ffffff',
};

const headerTitle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 4px 0',
};

const priorityBanner = {
    padding: '12px 32px',
    textAlign: 'center' as const,
};

const priorityText = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0',
};

const content = {
    padding: '32px',
};

const mainHeading = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
};

const introText = {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '24px',
    margin: '0 0 24px 0',
};

const hr = {
    borderColor: '#e2e8f0',
    margin: '24px 0',
};

const detailsSection = {
    marginBottom: '24px',
};

const sectionTitle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 16px 0',
};

const detailRow = {
    marginBottom: '12px',
};

const labelColumn = {
    width: '120px',
    verticalAlign: 'top' as const,
};

const valueColumn = {
    verticalAlign: 'top' as const,
};

const label = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748b',
    margin: '0',
};

const value = {
    fontSize: '14px',
    color: '#1e293b',
    margin: '0',
    fontWeight: '500',
};

const badge = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
};

const badgeText = {
    margin: '0',
    fontSize: '12px',
    fontWeight: '500',
};

const emailLink = {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
};

const descriptionSection = {
    marginBottom: '24px',
};

const descriptionBox = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
};

const descriptionText = {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '20px',
    margin: '0',
};

const actionSection = {
    marginTop: '24px',
};

const buttonColumn = {
    paddingRight: '8px',
};

const primaryButton = {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: '500',
    fontSize: '14px',
};

const primaryButtonText = {
    color: '#ffffff',
    margin: '0',
    fontSize: '14px',
    fontWeight: '500',
};

const secondaryButton = {
    backgroundColor: '#ffffff',
    color: '#374151',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: '500',
    fontSize: '14px',
    border: '1px solid #d1d5db',
};

const secondaryButtonText = {
    color: '#374151',
    margin: '0',
    fontSize: '14px',
    fontWeight: '500',
};

const footer = {
    backgroundColor: '#f8fafc',
    padding: '24px 32px',
    textAlign: 'center' as const,
};

const footerHr = {
    borderColor: '#e2e8f0',
    margin: '0 0 16px 0',
};

const footerText = {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 8px 0',
};

const footerSubtext = {
    fontSize: '12px',
    color: '#94a3b8',
    margin: '0',
};