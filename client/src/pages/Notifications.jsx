import { useEffect, useState } from "react";
import { List, Button, Card, Badge, message } from "antd";
import { getNotifications, markNotificationAsRead } from "../services/api";
import { getRole } from "../services/auth";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const role = getRole();

    useEffect(() => {
        async function fetchData() {
            const notificationData = await getNotifications();
            setNotifications(notificationData);
        }
        fetchData();
    }, []);

    async function handleMarkAsRead(id) {
        await markNotificationAsRead(id);
        message.success("Notification marked as read");
        setNotifications(notifications.filter(notification => notification.id !== id));
    }

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                <Card title="Unread Notifications">
                    <List
                        itemLayout="horizontal"
                        dataSource={notifications}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button type="link" onClick={() => handleMarkAsRead(item.id)}>Mark as Read</Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Badge status="processing" text={item.title} />}
                                    description={item.message}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            ) : (
                <Card>
                    <p>No new notifications.</p>
                </Card>
            )}
        </div>
    );
}

export default Notifications;
