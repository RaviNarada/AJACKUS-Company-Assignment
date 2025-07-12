document.addEventListener('DOMContentLoaded', () => {
    let employees = [...mockEmployees]; // Use a copy to allow modifications
    let currentEditEmployeeId = null; // To track which employee is being edited

    // DOM Elements
    const employeeGrid = document.getElementById('employee-grid');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const employeeFormContainer = document.getElementById('employee-form-container');
    const employeeForm = document.getElementById('employee-form');
    const formTitle = document.getElementById('form-title');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const searchInput = document.getElementById('search-input');
    const sortBySelect = document.getElementById('sort-by');
    const toggleFilterBtn = document.getElementById('toggle-filter-btn');
    const filterPanel = document.getElementById('filter-panel');
    const filterDepartmentSelect = document.getElementById('filter-department');
    const filterRoleSelect = document.getElementById('filter-role');
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const pageInfoSpan = document.getElementById('page-info');
    const itemsPerPageSelect = document.getElementById('items-per-page');

    // Pagination variables
    let currentPage = 1;
    let itemsPerPage = parseInt(itemsPerPageSelect.value);

    // --- Utility Functions ---

    // Function to generate a unique ID (simple for this assignment)
    function generateUniqueId() {
        return Math.max(...employees.map(emp => emp.id), 0) + 1;
    }

    // Function to display error messages for form fields
    function displayError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(`${fieldId}-error`);
        if (field && errorDiv) {
            field.closest('.form-group').classList.add('error');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    // Function to clear error messages
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
            el.closest('.form-group').classList.remove('error');
        });
    }

    // Function to validate form fields
    function validateForm(employee) {
        clearErrors();
        let isValid = true;

        if (!employee.firstName.trim()) {
            displayError('firstName', 'First Name is required.');
            isValid = false;
        }
        if (!employee.lastName.trim()) {
            displayError('lastName', 'Last Name is required.');
            isValid = false;
        }
        if (!employee.email.trim()) {
            displayError('email', 'Email is required.');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
            displayError('email', 'Invalid email format.');
            isValid = false;
        }
        if (!employee.department.trim()) {
            displayError('department', 'Department is required.');
            isValid = false;
        }
        if (!employee.role.trim()) {
            displayError('role', 'Role is required.');
            isValid = false;
        }

        return isValid;
    }

    // --- Rendering Functions ---

    // Function to render a single employee card
    function renderEmployeeCard(employee) {
        const card = document.createElement('div');
        card.classList.add('employee-card');
        card.setAttribute('data-id', employee.id);

        card.innerHTML = `
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <p><strong>ID:</strong> ${employee.id}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Role:</strong> ${employee.role}</p>
            <div class="card-actions">
                <button class="btn btn-edit" data-id="${employee.id}">Edit</button>
                <button class="btn btn-delete" data-id="${employee.id}">Delete</button>
            </div>
        `;

        // Add event listeners for edit and delete buttons on the card
        card.querySelector('.btn-edit').addEventListener('click', () => editEmployee(employee.id));
        card.querySelector('.btn-delete').addEventListener('click', () => deleteEmployee(employee.id));

        return card;
    }

    // Function to render the employee list
    function renderEmployeeList(employeesToRender) {
        employeeGrid.innerHTML = ''; // Clear existing cards

        if (employeesToRender.length === 0) {
            employeeGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No employees found matching your criteria.</p>';
            return;
        }

        employeesToRender.forEach(employee => {
            employeeGrid.appendChild(renderEmployeeCard(employee));
        });
    }

    // --- Core CRUD Operations ---

    // Add/Edit Employee Form Handler
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const employeeData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };

        if (!validateForm(employeeData)) {
            return; // Stop if validation fails
        }

        if (currentEditEmployeeId) {
            // Edit existing employee
            const index = employees.findIndex(emp => emp.id === currentEditEmployeeId);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...employeeData };
            }
        } else {
            // Add new employee
            const newEmployee = { id: generateUniqueId(), ...employeeData };
            employees.push(newEmployee);
        }

        // Re-render list and hide form
        applyFiltersAndSort(); // Re-apply filters/sort to include new/edited employee
        hideForm();
    });

    // Delete Employee
    function deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            employees = employees.filter(emp => emp.id !== id);
            applyFiltersAndSort(); // Re-render list
        }
    }

    // Edit Employee (Pre-fill form)
    function editEmployee(id) {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            currentEditEmployeeId = id;
            formTitle.textContent = 'Edit Employee';
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('role').value = employee.role;
            showForm();
        }
    }

    // --- Form Visibility ---

    function showForm() {
        employeeFormContainer.classList.remove('hidden');
    }

    function hideForm() {
        employeeFormContainer.classList.add('hidden');
        employeeForm.reset(); // Clear form fields
        clearErrors();
        currentEditEmployeeId = null; // Reset edit ID
        formTitle.textContent = 'Add New Employee'; // Reset title
    }

    // --- Search, Filter, Sort ---

    function applySearch(employeesToSearch, searchTerm) {
        if (!searchTerm) return employeesToSearch;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return employeesToSearch.filter(employee =>
            employee.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
            employee.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
            employee.email.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    function applyFilters(employeesToFilter, department, role) {
        return employeesToFilter.filter(employee => {
            const matchesDepartment = department ? employee.department === department : true;
            const matchesRole = role ? employee.role === role : true;
            return matchesDepartment && matchesRole;
        });
    }

    function applySort(employeesToSort, sortBy) {
        return [...employeesToSort].sort((a, b) => { // Create a shallow copy to avoid mutating original
            if (sortBy === 'firstNameAsc') {
                return a.firstName.localeCompare(b.firstName);
            } else if (sortBy === 'firstNameDesc') {
                return b.firstName.localeCompare(a.firstName);
            } else if (sortBy === 'departmentAsc') {
                return a.department.localeCompare(b.department);
            } else if (sortBy === 'departmentDesc') {
                return b.department.localeCompare(a.department);
            }
            return 0;
        });
    }

    // Main function to apply all current criteria and render
    function applyFiltersAndSort() {
        let filteredAndSearchedEmployees = employees;

        const searchTerm = searchInput.value.trim();
        filteredAndSearchedEmployees = applySearch(filteredAndSearchedEmployees, searchTerm);

        const departmentFilter = filterDepartmentSelect.value;
        const roleFilter = filterRoleSelect.value;
        filteredAndSearchedEmployees = applyFilters(filteredAndSearchedEmployees, departmentFilter, roleFilter);

        const sortBy = sortBySelect.value;
        const sortedEmployees = applySort(filteredAndSearchedEmployees, sortBy);

        // Reset current page if it's out of bounds after filtering/sorting
        const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }

        renderPaginatedEmployees(sortedEmployees);
    }

    // --- Pagination ---

    function renderPaginatedEmployees(filteredAndSortedEmployees) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const employeesForPage = filteredAndSortedEmployees.slice(startIndex, endIndex);

        renderEmployeeList(employeesForPage);
        updatePaginationControls(filteredAndSortedEmployees.length);
    }

    function updatePaginationControls(totalEmployees) {
        const totalPages = Math.ceil(totalEmployees / itemsPerPage);
        pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages || 1}`;

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    function goToPage(page) {
        currentPage = page;
        applyFiltersAndSort();
    }

    // --- Event Listeners ---

    addEmployeeBtn.addEventListener('click', showForm);
    cancelFormBtn.addEventListener('click', hideForm);

    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset to first page on search
        applyFiltersAndSort();
    });

    sortBySelect.addEventListener('change', applyFiltersAndSort);

    toggleFilterBtn.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
    });

    applyFilterBtn.addEventListener('click', () => {
        currentPage = 1; // Reset to first page on filter
        applyFiltersAndSort();
        filterPanel.classList.add('hidden'); // Hide panel after applying
    });

    clearFilterBtn.addEventListener('click', () => {
        filterDepartmentSelect.value = '';
        filterRoleSelect.value = '';
        currentPage = 1; // Reset to first page on clear filter
        applyFiltersAndSort();
        filterPanel.classList.add('hidden'); // Hide panel after clearing
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(
            applyFilters(
                applySearch(employees, searchInput.value.trim()),
                filterDepartmentSelect.value,
                filterRoleSelect.value
            ).length / itemsPerPage
        );
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });

    itemsPerPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(itemsPerPageSelect.value);
        currentPage = 1; // Reset to first page when items per page changes
        applyFiltersAndSort();
    });

    // Initial render when the page loads
    applyFiltersAndSort();
});