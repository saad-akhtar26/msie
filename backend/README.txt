Notifications...

We will check if Notification need to generate - on login  ONLY

We will NOT generate advance or late Notification

User will READ or remove the Notification manually. Otherwise Notifications will remain in the record.

We will calculate if Notification need to be generated TODAY ONLY.
    We will generate Notifications, without checking duplication.
        MongoDB will handle the duplication with the UNIQUE index

=====================================================================================================================

1. Pick equipments with "next_date" before today
2. calculate iterative new "next_date"
3. Check if new "next_date" is today
    a. IF TRUE, generate Notification
        I. Might also need to check for duplication