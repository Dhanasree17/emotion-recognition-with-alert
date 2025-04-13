from fer import FER
import cv2
import vonage
import requests
import os

client = vonage.Client(key="ff60c567", secret="EChpfJ6cglGJDycw")
sms = vonage.Sms(client)

# Function to send SMS alert
def send_sms_alert(phone_number, message):
    responseData = sms.send_message(
        {
            "from": "Vonage APIs",
            "to": phone_number,
            "text": message,
        }
    )

    if responseData["messages"][0]["status"] == "0":
        print("Message sent successfully.")
    else:
        print(f"Message failed with error: {responseData['messages'][0]['error-text']}")

def detect_emotion(user_id,phone_number):
    detector = FER()
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        result = detector.detect_emotions(frame)
        
        if result:
            emotions = result[0]['emotions']
            dominant_emotion = max(emotions, key=emotions.get)
            print(f"Detected emotion: {dominant_emotion}")

            bounding_box = result[0]['box']
            x, y, w, h = bounding_box
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)


            cv2.putText(frame, f"Emotion: {dominant_emotion}",
                        (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.9, (0, 0, 255), 2, cv2.LINE_AA)
            
            if dominant_emotion in ['sad','fear']:
                # Trigger alert
                print("ALERT!!!!!!!!")
                send_sms_alert(phone_number,f"Alert for user{user_id}:Detected emotion is {dominant_emotion}")
        
        cv2.imshow('Emotion Detection', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()



detect_emotion(user_id="person1",phone_number="916301158610")
#python emotionrecog.py