<script>
    // Payment method toggle
    const paymentMethods = document.querySelectorAll('.payment-method');
    const creditCardFields = document.getElementById('credit-card-fields');
    const bankTransferFields = document.getElementById('bank-transfer-fields');
    const digitalWalletFields = document.getElementById('digital-wallet-fields');

    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Reset all methods first
            paymentMethods.forEach(item => item.classList.remove('selected'));
            creditCardFields.style.display = 'none';
            bankTransferFields.style.display = 'none';
            digitalWalletFields.style.display = 'none';

            // Set selected method
            method.classList.add('selected');
            if (method.textContent.trim() === 'Credit Card') {
                creditCardFields.style.display = 'block';
            } else if (method.textContent.trim() === 'Bank Transfer') {
                bankTransferFields.style.display = 'block';
            } else if (method.textContent.trim() === 'Digital Wallet') {
                digitalWalletFields.style.display = 'block';
            }
        });
    });

    // Handle the payment form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

    // Display success message (can be enhanced with actual payment integration)
    const paymentSuccess = document.getElementById('payment-success');
    paymentSuccess.style.display = 'block';

    // Hide payment form
    document.getElementById('payment-form-container').style.display = 'none';
    });

    // Handle save preferences button click
    const savePreferencesButton = document.getElementById('save-preferences');
    savePreferencesButton.addEventListener('click', () => {
        const paymentFrequency = document.getElementById('payment-frequency').value;
    const autoPayEnabled = document.getElementById('autopay').checked;
    const reminderEnabled = document.getElementById('reminder').checked;
    const receiptEnabled = document.getElementById('receipt').checked;

    console.log('Preferences Saved:', {
        paymentFrequency,
        autoPayEnabled,
        reminderEnabled,
        receiptEnabled
    });

    alert('Preferences saved!');
    });
</script>
