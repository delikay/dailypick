// Mobile Navbar Test Script
// Run this in browser console to test mobile navbar functionality

function testMobileNavbar() {
    console.log('🧪 Testing Mobile Navbar...');
    
    // Test 1: Check if mobile menu button exists
    const menuButton = document.querySelector('button[aria-controls="mobile-navigation"]');
    if (menuButton) {
        console.log('✅ Mobile menu button found');
    } else {
        console.log('❌ Mobile menu button not found');
        return;
    }
    
    // Test 2: Check if mobile menu is initially hidden
    const mobileMenu = document.getElementById('mobile-navigation');
    if (mobileMenu && !mobileMenu.closest('[aria-hidden="false"]')) {
        console.log('✅ Mobile menu initially hidden');
    } else {
        console.log('❌ Mobile menu not properly hidden');
    }
    
    // Test 3: Simulate mobile viewport
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
    });
    
    // Test 4: Toggle mobile menu
    menuButton.click();
    setTimeout(() => {
        const isOpen = mobileMenu.closest('[aria-hidden="false"]');
        if (isOpen) {
            console.log('✅ Mobile menu opens correctly');
        } else {
            console.log('❌ Mobile menu failed to open');
        }
        
        // Test 5: Check scroll lock
        const bodyStyle = window.getComputedStyle(document.body);
        if (bodyStyle.overflow === 'hidden') {
            console.log('✅ Scroll lock applied');
        } else {
            console.log('❌ Scroll lock not applied');
        }
        
        // Test 6: Close menu
        menuButton.click();
        setTimeout(() => {
            const isClosed = !mobileMenu.closest('[aria-hidden="false"]');
            if (isClosed) {
                console.log('✅ Mobile menu closes correctly');
            } else {
                console.log('❌ Mobile menu failed to close');
            }
            
            // Test 7: Check scroll restoration
            const bodyStyleAfter = window.getComputedStyle(document.body);
            if (bodyStyleAfter.overflow !== 'hidden') {
                console.log('✅ Scroll restored correctly');
            } else {
                console.log('❌ Scroll not restored');
            }
            
            // Restore original width
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalWidth
            });
            
            console.log('🏁 Mobile navbar test completed');
        }, 100);
    }, 100);
}

// Auto-run test
testMobileNavbar();
