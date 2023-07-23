
async function handleNotificationsToggle() {
    const apiEndpoint = '/updateSettings';
    const notificationsToggle = document.getElementById('notificationsToggle');

    const isChecked = notificationsToggle.checked;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isPushEnabled: isChecked })
      });

      if (!response.ok) {
        throw new Error('Failed to update notification settings.');
      }

      const data = await response.json();
      console.log(data); // Log the response data from the API if needed
    } catch (error) {
      console.error(error);
    }
  }
