const mockEmployees = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com', department: 'Sales', role: 'Associate' },
    { id: 4, firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@example.com', department: 'Marketing', role: 'Specialist' },
    { id: 5, firstName: 'Robert', lastName: 'Davis', email: 'robert.davis@example.com', department: 'Finance', role: 'Analyst' },
    { id: 6, firstName: 'Emily', lastName: 'Wilson', email: 'emily.wilson@example.com', department: 'HR', role: 'Recruiter' },
    { id: 7, firstName: 'Michael', lastName: 'Miller', email: 'michael.miller@example.com', department: 'IT', role: 'Engineer' },
    { id: 8, firstName: 'Sarah', lastName: 'Moore', email: 'sarah.moore@example.com', department: 'Sales', role: 'Manager' },
    { id: 9, firstName: 'David', lastName: 'Taylor', email: 'david.taylor@example.com', department: 'Marketing', role: 'Coordinator' },
    { id: 10, firstName: 'Laura', lastName: 'Anderson', email: 'laura.anderson@example.com', department: 'Finance', role: 'Accountant' },
    { id: 11, firstName: 'Chris', lastName: 'Thomas', email: 'chris.thomas@example.com', department: 'IT', role: 'DevOps' },
    { id: 12, firstName: 'Anna', lastName: 'Jackson', email: 'anna.jackson@example.com', department: 'HR', role: 'Specialist' },
    { id: 13, firstName: 'Daniel', lastName: 'White', email: 'daniel.white@example.com', department: 'Sales', role: 'Lead' },
    { id: 14, firstName: 'Olivia', lastName: 'Harris', email: 'olivia.harris@example.com', department: 'Marketing', role: 'Manager' },
    { id: 15, firstName: 'James', lastName: 'Martin', email: 'james.martin@example.com', department: 'Finance', role: 'Controller' },
    { id: 16, firstName: 'Sophia', lastName: 'Garcia', email: 'sophia.garcia@example.com', department: 'IT', role: 'UI/UX Designer' },
    { id: 17, firstName: 'Liam', lastName: 'Rodriguez', email: 'liam.rodriguez@example.com', department: 'HR', role: 'Administrator' },
    { id: 18, firstName: 'Ava', lastName: 'Martinez', email: 'ava.martinez@example.com', department: 'Sales', role: 'Representative' },
    { id: 19, firstName: 'Noah', lastName: 'Hernandez', email: 'noah.hernandez@example.com', department: 'Marketing', role: 'Analyst' },
    { id: 20, firstName: 'Isabella', lastName: 'Lopez', email: 'isabella.lopez@example.com', department: 'Finance', role: 'Auditor' },
    { id: 21, firstName: 'Mason', lastName: 'Gonzalez', email: 'mason.gonzalez@example.com', department: 'IT', role: 'Tester' },
    { id: 22, firstName: 'Charlotte', lastName: 'Perez', email: 'charlotte.perez@example.com', department: 'HR', role: 'Coordinator' },
    { id: 23, firstName: 'William', lastName: 'Sanchez', email: 'william.sanchez@example.com', department: 'Sales', role: 'Engineer' },
    { id: 24, firstName: 'Amelia', lastName: 'Ramirez', email: 'amelia.ramirez@example.com', department: 'Marketing', role: 'Strategist' },
    { id: 25, firstName: 'Ethan', lastName: 'Roberts', email: 'ethan.roberts@example.com', department: 'Finance', role: 'Specialist' },
    { id: 26, firstName: 'Harper', lastName: 'Campbell', email: 'harper.campbell@example.com', department: 'IT', role: 'Support' },
    { id: 27, firstName: 'Evelyn', lastName: 'Kelly', email: 'evelyn.kelly@example.com', department: 'HR', role: 'Generalist' },
    { id: 28, firstName: 'Aiden', lastName: 'Russell', email: 'aiden.russell@example.com', department: 'Sales', role: 'Consultant' },
    { id: 29, firstName: 'Abigail', lastName: 'Edwards', email: 'abigail.edwards@example.com', department: 'Marketing', role: 'Campaign Manager' },
    { id: 30, firstName: 'Lucas', lastName: 'Morgan', email: 'lucas.morgan@example.com', department: 'Finance', role: 'Accountant' },
];