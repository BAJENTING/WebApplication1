// Payment method selection
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function () {
        // Remove selected class from all methods
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('selected');
        });
        // Add selected class to clicked method
        this.classList.add('selected');

        // Show/hide relevant payment form fields based on selection
        const methodType = this.querySelector('div').textContent;
        togglePaymentFields(methodType);
    });
});

// Function to toggle payment fields based on payment method
function togglePaymentFields(methodType) {
    const creditCardFields = document.getElementById('credit-card-fields');
    const bankTransferFields = document.getElementById('bank-transfer-fields');
    const digitalWalletFields = document.getElementById('digital-wallet-fields');

    // Hide all first
    creditCardFields.style.display = 'none';
    bankTransferFields.style.display = 'none';
    digitalWalletFields.style.display = 'none';

    // Show relevant one
    if (methodType === 'Credit Card') {
        creditCardFields.style.display = 'block';
    } else if (methodType === 'Bank Transfer') {
        bankTransferFields.style.display = 'block';
    } else if (methodType === 'Digital Wallet') {
        digitalWalletFields.style.display = 'block';
    }
}

// Payment form submission
document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    const payButton = this.querySelector('button[type="submit"]');
    const originalText = payButton.textContent;
    payButton.textContent = 'Processing...';
    payButton.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        // Show success message
        document.getElementById('payment-success').style.display = 'block';
        document.getElementById('payment-form-container').style.display = 'none';

        // Update payment status in summary
        document.getElementById('payment-status').className = 'status paid';
        document.getElementById('payment-status').textContent = 'Paid';

        // Update payment history table
        updatePaymentHistory();

        // Reset form
        payButton.textContent = originalText;
        payButton.disabled = false;
    }, 2000);
});

// Update payment history table with new payment
function updatePaymentHistory() {
    const table = document.querySelector('.table tbody');
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${today}</td>
    <td>Monthly HOA Fee</td>
    <td>$325.00</td>
    <td><span class="status paid">Paid</span></td>
  `;

    // Insert at the beginning of the table
    table.insertBefore(newRow, table.firstChild);
}

// Auto-pay toggle functionality
document.getElementById('autopay').addEventListener('change', function () {
    const frequencySelect = document.getElementById('payment-frequency');
    if (this.checked) {
        frequencySelect.disabled = false;
    } else {
        frequencySelect.disabled = true;
    }
});

// Save preferences button
document.getElementById('save-preferences').addEventListener('click', function () {
    const button = this;
    const originalText = button.textContent;

    button.textContent = 'Saving...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Saved!';
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    }, 1000);
});