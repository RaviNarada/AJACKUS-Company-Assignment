<#-- This file conceptually represents how Freemarker would render the initial dashboard. -->
<#-- For this client-side assignment, index.html directly serves as the entry point, -->
<#-- and app.js handles all dynamic rendering using mockEmployees from data.js. -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>Employee Directory</h1>
            <div class="header-controls">
                <input type="text" id="search-input" placeholder="Search by name or email...">
                <button id="add-employee-btn" class="btn btn-primary">Add Employee</button>
            </div>
            <div class="filter-sort-controls">
                <div class="sort-controls">
                    <label for="sort-by">Sort by:</label>
                    <select id="sort-by">
                        <option value="firstNameAsc">First Name (A-Z)</option>
                        <option value="firstNameDesc">First Name (Z-A)</option>
                        <option value="departmentAsc">Department (A-Z)</option>
                        <option value="departmentDesc">Department (Z-A)</option>
                    </select>
                </div>
                <div class="filter-controls">
                    <button id="toggle-filter-btn" class="btn btn-secondary">Filter</button>
                    <div id="filter-panel" class="filter-panel hidden">
                        <h3>Filter Employees</h3>
                        <div class="form-group">
                            <label for="filter-department">Department:</label>
                            <select id="filter-department">
                                <option value="">All</option>
                                <option value="HR">HR</option>
                                <option value="IT">IT</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="filter-role">Role:</label>
                            <select id="filter-role">
                                <option value="">All</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Analyst">Analyst</option>
                                <option value="Associate">Associate</option>
                                <option value="Specialist">Specialist</option>
                            </select>
                        </div>
                        <button id="apply-filter-btn" class="btn btn-primary">Apply Filters</button>
                        <button id="clear-filter-btn" class="btn btn-secondary">Clear Filters</button>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <div id="employee-list-container">
                <div id="employee-grid" class="employee-grid">
                    <#-- This section would be dynamically populated by Freemarker if it were active -->
                    <#-- Example: -->
                    <#-- <#if employees?has_content>
                        <#list employees as employee>
                            <div class="employee-card" data-id="${employee.id}">
                                <h3>${employee.firstName} ${employee.lastName}</h3>
                                <p>ID: ${employee.id}</p>
                                <p>Email: ${employee.email}</p>
                                <p>Department: ${employee.department}</p>
                                <p>Role: ${employee.role}</p>
                                <div class="card-actions">
                                    <button class="btn btn-edit" data-id="${employee.id}">Edit</button>
                                    <button class="btn btn-delete" data-id="${employee.id}">Delete</button>
                                </div>
                            </div>
                        </#list>
                    <#else>
                        <p>No employees found.</p>
                    </#if> -->
                </div>
            </div>

            <div id="pagination-controls" class="pagination-controls">
                <button id="prev-page-btn" class="btn btn-secondary" disabled>Previous</button>
                <span id="page-info">Page 1 of 1</span>
                <button id="next-page-btn" class="btn btn-secondary" disabled>Next</button>
                <label for="items-per-page">Items per page:</label>
                <select id="items-per-page">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>

            <div id="employee-form-container" class="form-overlay hidden">
                <div class="form-card">
                    <h2><span id="form-title">Add New Employee</span></h2>
                    <form id="employee-form">
                        <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" required>
                            <div class="error-message" id="firstName-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" required>
                            <div class="error-message" id="lastName-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                            <div class="error-message" id="email-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="department">Department:</label>
                            <select id="department" name="department" required>
                                <option value="">Select Department</option>
                                <option value="HR">HR</option>
                                <option value="IT">IT</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                            </select>
                            <div class="error-message" id="department-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="role">Role:</label>
                            <input type="text" id="role" name="role" required>
                            <div class="error-message" id="role-error"></div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Save</button>
                            <button type="button" id="cancel-form-btn" class="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>