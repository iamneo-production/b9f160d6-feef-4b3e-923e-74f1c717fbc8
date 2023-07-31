# b9f160d6-feef-4b3e-923e-74f1c717fbc8
https://sonarcloud.io/summary/overall?id=examly-test_b9f160d6-feef-4b3e-923e-74f1c717fbc8


# For logging as admin, use the credentials:

email: team21@gmail.com
password: 1234

Note: You can edit the credentials in the admin profile after you have logged in.

# Updating Cross-Origin URLs for React and Spring Boot Applications

To ensure smooth communication between your React frontend and Spring Boot backend, follow these steps to update the Cross-Origin URLs:

## Update Spring Boot Port URL in React

1. Open the React application codebase.
2. Navigate to `reactapp/src/utils/api.js`.
3. Find line number 3 and update the `BASE_URL` constant with the Spring Boot port URL.

Example:
javascript
const BASE_URL = "http://localhost:9000"; // Replace this with your Spring Boot port URL


## Update React Port URL in Spring Boot

1. Open the Spring Boot application codebase.
2. Go to `springapp/src/main/java/com/examly/springapp/auth` and open `AuthenticationController.java`.
3. Similarly, navigate to `springapp/src/main/java/com/examly/springapp/controller` and open the following classes:
   - `CustomerController.java`
   - `EmployeeController.java`
   - `DeviceController.java`
   - `RepairController.java`

4. In each of the above controller classes, locate the `@CrossOrigin` annotation and update the URL with the React application's port URL.

Example:
java
@CrossOrigin("http://localhost:3000") // Replace this with your React application port URL
@RestController
@RequestMapping("/api")
public class CommunicationController {
   // Controller code here
}


Additionally, in `springapp/src/main/java/com/example/springapp/SpringappApplication.java`, go to line 23 where you will find `.allowedOrigins("http://localhost:3000")`. Update this URL with your React application's port URL.

Note:
- Replace `http://localhost:9000` with your actual Spring Boot application's port URL.
- Replace `http://localhost:3000` with your actual React application's port URL.

By following these steps, you will enable Cross-Origin requests between your React frontend and Spring Boot backend applications, ensuring they work seamlessly together.