// --- DOM References ---
const messageArea = document.getElementById('message-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const sidebarList = document.getElementById('sidebar-list');
const chatHeaderAvatar = document.getElementById('chat-header-avatar');
const chatHeaderName = document.getElementById('chat-header-name');
const chatHeaderStatus = document.getElementById('chat-header-status');
const chatHeaderOnlineStatus = document.getElementById('chat-header-onlinestatus');
const statusSection = document.getElementById('status-section');
const statusToggle = document.getElementById('status-toggle');
const bgChangerButton = document.getElementById('bg-changer-button');
const bgDropdown = document.getElementById('bg-dropdown');
const profileModal = document.getElementById('profileModal');
const modalImage = document.getElementById('modalImage');
const closeModalButton = document.getElementById('closeModal');
const emojiButton = document.getElementById('emoji-button');
const emojiPickerContainer = document.getElementById('emoji-picker-container');

// --- Stories Data ---
const stories = [
    { id: 'mumma', name: 'Mumma', avatar: 'WhatsApp Image 2024-07-30 at 07.20.34_0d0e670a.jpg', time: '2m', viewed: false },
    { id: 'tanu', name: 'Tanu', avatar: 'https://placehold.co/40x40/F59E0B/FFF?text=TB', time: '5m', viewed: true },
    { id: 'drashti', name: 'Drashti', avatar: 'https://placehold.co/40x40/6366F1/FFF?text=DB', time: '15m', viewed: false },
    { id: 'aesha', name: 'Aesha', avatar: 'https://placehold.co/40x40/8B5CF6/FFF?text=AE', time: '1h', viewed: true },
    { id: 'isha', name: 'Isha', avatar: 'https://placehold.co/40x40/10B981/FFF?text=IS', time: '2h', viewed: false }
];

// --- Bot Data ---
const bots = [
    // Groups
    { id: 'weird', name: 'Herd of Weirdos', avatar: 'https://placehold.co/40x40/EC4899/FFF?text=HW', online: true, description: 'A group of unique individuals', color: 'EC4899', isGroup: true, members: 5 },
    { id: 'ldit', name: 'LDIT Students', avatar: 'https://placehold.co/40x40/6366F1/FFF?text=LD', online: true, description: 'Online', color: '6366F1', isGroup: true, members: 120 },
    { id: 'ldofficial', name: 'LD Official', avatar: 'https://placehold.co/40x40/14B8A6/FFF?text=LO', online: false, description: 'Last seen 5 minutes ago', color: '14B8A6', isGroup: true, members: 15 },
    
    // Individual Users
    { id: 'echo', name: 'Mumma', avatar: 'WhatsApp Image 2024-07-30 at 07.20.34_0d0e670a.jpg', online: true, description: 'Repeats what you say', color: '34D399', isGroup: false },
    { id: 'info', name: 'Tanu', avatar: 'https://placehold.co/40x40/F59E0B/FFF?text=TB', online: true, description: 'Gives basic info', color: 'F59E0B', isGroup: false },
    { id: 'time', name: 'Drashti', avatar: 'https://placehold.co/40x40/6366F1/FFF?text=DB', online: false, description: 'Tells the current time', color: '6366F1', isGroup: false },
    { id: 'aesha', name: 'Aesha', avatar: 'https://placehold.co/40x40/8B5CF6/FFF?text=AE', online: true, description: 'Online', color: '8B5CF6', isGroup: false },
    { id: 'isha', name: 'Isha', avatar: 'https://placehold.co/40x40/10B981/FFF?text=IS', online: false, description: 'Last seen 2 hours ago', color: '10B981', isGroup: false },
    { id: 'papa', name: 'Papa', avatar: 'https://placehold.co/40x40/EF4444/FFF?text=PA', online: true, description: 'Online', color: 'EF4444', isGroup: false },
    { id: 'jinesh', name: 'Jinesh', avatar: 'https://placehold.co/40x40/3B82F6/FFF?text=JI', online: false, description: 'Last seen yesterday', color: '3B82F6', isGroup: false },
    { id: 'meera', name: 'Meera', avatar: 'https://placehold.co/40x40/F59E0B/FFF?text=ME', online: true, description: 'Online', color: 'F59E0B', isGroup: false },
    { id: 'shailee', name: 'Shailee', avatar: 'https://placehold.co/40x40/EC4899/FFF?text=SH', online: false, description: 'Last seen 1 hour ago', color: 'EC4899', isGroup: false }
];

let currentChatBot = null;
let botReplyTimeout = null;

// --- Functions ---

/**
 * Populates the stories section
 */
function populateStories() {
    const storiesContainer = document.querySelector('#status-section .flex.space-x-2.overflow-x-auto');
    if (!storiesContainer) return; // Guard clause if container not found
    
    // Clear existing stories
    storiesContainer.innerHTML = '';
    
    // Add My Story first
    const myStoryItem = document.createElement('div');
    myStoryItem.classList.add('flex', 'flex-col', 'items-center', 'space-y-1', 'min-w-[60px]', 'cursor-pointer');
    
    const myStoryContainer = document.createElement('div');
    myStoryContainer.classList.add('relative');
    
    const myStoryImg = document.createElement('img');
    myStoryImg.src = 'https://placehold.co/40x40/34D399/FFF?text=MY';
    myStoryImg.alt = 'My Story';
    myStoryImg.classList.add('w-14', 'h-14', 'rounded-full', 'ring-2', 'ring-indigo-500', 'p-0.5');
    
    const addButton = document.createElement('button');
    addButton.classList.add('absolute', 'bottom-0', 'right-0', 'bg-indigo-500', 'text-white', 'rounded-full', 'p-1');
    addButton.innerHTML = '<i data-lucide="plus" class="h-3 w-3"></i>';
    
    const myStoryName = document.createElement('span');
    myStoryName.classList.add('text-xs', 'text-gray-500');
    myStoryName.textContent = 'My Story';
    
    myStoryContainer.appendChild(myStoryImg);
    myStoryContainer.appendChild(addButton);
    myStoryItem.appendChild(myStoryContainer);
    myStoryItem.appendChild(myStoryName);
    
    storiesContainer.appendChild(myStoryItem);
    
    // Add other stories
    stories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('flex', 'flex-col', 'items-center', 'space-y-1', 'min-w-[60px]', 'cursor-pointer');
        
        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add('relative');
        
        const img = document.createElement('img');
        img.src = story.avatar;
        img.alt = story.name;
        img.classList.add('w-14', 'h-14', 'rounded-full', 'ring-2', story.viewed ? 'ring-gray-300' : 'ring-indigo-500', 'p-0.5');
        
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('text-xs', 'text-gray-500');
        timeSpan.textContent = story.name;
        
        avatarContainer.appendChild(img);
        storyItem.appendChild(avatarContainer);
        storyItem.appendChild(timeSpan);
        
        storiesContainer.appendChild(storyItem);
    });
    
    // Reinitialize Lucide icons for the new elements
    lucide.createIcons();
}

/**
 * Toggles the status section visibility
 */
function toggleStatusSection() {
    statusSection.classList.toggle('hidden');
    // Update the toggle button icon
    const icon = statusToggle.querySelector('i');
    if (statusSection.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'circle-dot');
    } else {
        icon.setAttribute('data-lucide', 'circle');
        // Repopulate stories when section is shown
        populateStories();
    }
    lucide.createIcons();
}

/**
 * Populates the sidebar with bot list items.
 */
function populateSidebar() {
    sidebarList.innerHTML = '';
    
    // Add Groups Section
    const groupsSection = document.createElement('div');
    groupsSection.classList.add('px-4', 'py-2', 'text-xs', 'font-semibold', 'text-gray-500', 'uppercase');
    groupsSection.textContent = 'Groups';
    sidebarList.appendChild(groupsSection);

    // Add Groups
    bots.filter(bot => bot.isGroup).forEach(bot => {
        const item = createSidebarItem(bot);
        sidebarList.appendChild(item);
    });

    // Add Contacts Section
    const contactsSection = document.createElement('div');
    contactsSection.classList.add('px-4', 'py-2', 'text-xs', 'font-semibold', 'text-gray-500', 'uppercase', 'mt-4');
    contactsSection.textContent = 'Contacts';
    sidebarList.appendChild(contactsSection);

    // Add Individual Contacts
    bots.filter(bot => !bot.isGroup).forEach(bot => {
        const item = createSidebarItem(bot);
        sidebarList.appendChild(item);
    });
}

/**
 * Adds a message bubble to the chat area.
 * @param {string} messageText - The text content of the message.
 * @param {'sent' | 'received'} type - The type of message.
 * @param {object | null} senderBot - The bot object if it's a received message.
 */
function addMessage(messageText, type = 'sent', senderBot = null) {
    if (!messageText || !messageText.trim()) return; // Don't add empty messages

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('flex', 'items-end', 'mb-4'); // Added margin-bottom

    const messageContentWrapper = document.createElement('div');
    messageContentWrapper.classList.add('flex', 'flex-col', 'space-y-1', 'text-sm', 'max-w-xs', 'mx-2');

    const messageBubble = document.createElement('div');
    const messageSpan = document.createElement('span');
    messageSpan.classList.add('px-4', 'py-2', 'rounded-lg', 'inline-block', 'shadow');
    messageSpan.textContent = messageText; // Use textContent for security

    messageBubble.appendChild(messageSpan);
    messageContentWrapper.appendChild(messageBubble);

    if (type === 'sent') {
        // Style for sent messages
        messageWrapper.classList.add('justify-end');
        messageContentWrapper.classList.add('order-1', 'items-end');
        messageSpan.classList.add('rounded-br-none', 'chat-bubble-sent', 'text-gray-800');
    } else {
        // Style for received messages
        messageWrapper.classList.add('justify-start');
        messageContentWrapper.classList.add('order-2', 'items-start');
        messageSpan.classList.add('rounded-bl-none', 'chat-bubble-received', 'bg-white'); // Ensure white background

        // Add avatar for received messages
        if (senderBot) {
            const avatar = document.createElement('img');
            // ***** UPDATED: Use actual avatar for small chat bubble image *****
            if (senderBot.id === 'echo') { // Check if it's Mumma
                 avatar.src = senderBot.avatar; // Use the uploaded image file
            } else {
                 // Use placeholder for other bots
                 avatar.src = `https://placehold.co/24x24/${senderBot.color}/FFF?text=${senderBot.name.substring(0,1)}${senderBot.name.split(' ')[1]?.[0] ?? ''}`;
            }
            avatar.alt = `${senderBot.name}'s avatar`;
            avatar.classList.add('w-6', 'h-6', 'rounded-full', 'order-1');
            messageWrapper.appendChild(avatar);
        }
    }

    messageWrapper.appendChild(messageContentWrapper);
    messageArea.appendChild(messageWrapper);

    // Scroll to the bottom of the message area smoothly
    messageArea.scrollTo({ top: messageArea.scrollHeight, behavior: 'smooth' });
}

/**
 * Simulates a reply from the current bot.
 * @param {string} userMessage - The message sent by the user.
 */
function simulateBotResponse(userMessage) {
     if (!currentChatBot || !currentChatBot.online) return; // Only online bots reply

     // Clear any previous pending reply
     if (botReplyTimeout) clearTimeout(botReplyTimeout);

     botReplyTimeout = setTimeout(() => {
         let reply = "Sorry, I didn't understand that.";
         switch (currentChatBot.id) {
             case 'echo': // Mumma
                 reply = `Echo: ${userMessage}`; // Keeping original bot logic for demo
                 break;
             case 'info': // Tanu
                 if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
                     reply = `Hello there! I am ${currentChatBot.name}.`;
                 } else if (userMessage.toLowerCase().includes('help')) {
                     reply = "I can provide basic information. Try asking 'hello'.";
                 } else {
                      reply = "I have limited information. Ask 'hello' or 'help'.";
                 }
                 break;
             case 'time': // Drashti
                  reply = "I seem to be offline right now.";
                  break;
         }
         addMessage(reply, 'received', currentChatBot);
     }, 800 + Math.random() * 500); // Add a small delay
}

/**
 * Handles sending a user message and triggering bot response.
 */
function sendMessage() {
    const messageText = messageInput.value;
    if (!messageText.trim() || !currentChatBot) return;

    addMessage(messageText, 'sent');
    simulateBotResponse(messageText);

    // Clear the input field
    messageInput.value = '';
    messageInput.focus(); // Keep focus on input
}

/**
 * Switches the active chat to the selected bot.
 * @param {string} botId - The ID of the bot to switch to.
 */
function switchChat(botId) {
    const selectedBot = bots.find(bot => bot.id === botId);
    if (!selectedBot) return;

    currentChatBot = selectedBot;

    // Update header
    chatHeaderAvatar.src = currentChatBot.avatar; 
    chatHeaderAvatar.alt = `${currentChatBot.name}'s Avatar`;
    // Add click listener to header avatar
    chatHeaderAvatar.onclick = () => openProfileModal(currentChatBot.avatar);
    chatHeaderAvatar.classList.add('cursor-pointer'); // Add cursor-pointer

    chatHeaderName.textContent = currentChatBot.name;
    chatHeaderOnlineStatus.textContent = currentChatBot.online ? 'Online' : 'Offline';
    chatHeaderStatus.innerHTML = currentChatBot.online
        ? `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="text-green-500"><circle cx="10" cy="10" r="10"></circle></svg>`
        : `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="text-gray-400"><circle cx="10" cy="10" r="10"></circle></svg>`;


    // Clear message area and add welcome message
    messageArea.innerHTML = ''; // Clear previous messages
    addMessage(`You are now chatting with ${currentChatBot.name}. ${currentChatBot.description}.`, 'received', currentChatBot);
    if (!currentChatBot.online) {
         addMessage(`${currentChatBot.name} is currently offline.`, 'received', currentChatBot);
    }


    // Enable input/send button
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.placeholder = `Message ${currentChatBot.name}...`;

    // Update active state in sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.botId === botId) {
            item.classList.add('active');
        }
    });

     // Clear any pending bot reply from the previous chat
     if (botReplyTimeout) clearTimeout(botReplyTimeout);

    messageInput.focus();
}

function createSidebarItem(bot) {
    const item = document.createElement('button');
    item.classList.add('sidebar-item', 'flex', 'items-center', 'w-full', 'px-4', 'py-3', 'hover:bg-gray-100', 'focus:outline-none', 'transition', 'duration-150', 'ease-in-out');
    item.dataset.botId = bot.id;

    const avatarImg = document.createElement('img');
    avatarImg.src = bot.avatar;
    avatarImg.alt = bot.name;
    avatarImg.classList.add('w-10', 'h-10', 'rounded-full', 'mr-3', 'flex-shrink-0', 'cursor-pointer'); // Add cursor-pointer
    avatarImg.onerror = function() {
        this.src = `https://placehold.co/40x40/${bot.color}/FFF?text=${bot.name.substring(0,1)}${bot.name.split(' ')[1]?.[0] ?? ''}`;
        this.alt = `${bot.name} (Image Error)`;
    };
    // Add click listener to avatar image
    avatarImg.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent sidebar item click
        openProfileModal(bot.avatar);
    });

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('flex-grow', 'text-left');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('font-semibold', 'text-sm', 'text-gray-700');
    nameDiv.textContent = bot.name;

    const statusDiv = document.createElement('div');
    statusDiv.classList.add('text-xs', bot.online ? 'text-green-600' : 'text-gray-500');
    
    if (bot.isGroup) {
        statusDiv.textContent = `${bot.members} members • ${bot.online ? 'Online' : bot.description}`;
    } else {
        statusDiv.textContent = bot.online ? 'Online' : bot.description;
    }

    textWrapper.appendChild(nameDiv);
    textWrapper.appendChild(statusDiv);
    item.appendChild(avatarImg);
    item.appendChild(textWrapper);

    item.addEventListener('click', () => switchChat(bot.id));
    return item;
}

/**
 * Sets the chat background image.
 * @param {string} imageUrl - The URL of the background image.
 */
function setChatBackground(imageUrl) {
    messageArea.style.backgroundImage = `url('${imageUrl}')`;
}

/**
 * Toggles the background changer dropdown visibility.
 */
function toggleBackgroundDropdown() {
    bgDropdown.classList.toggle('hidden');
}

/**
 * Opens the profile picture modal.
 * @param {string} imageUrl - The URL of the image to display.
 */
function openProfileModal(imageUrl) {
    if (!imageUrl || imageUrl.startsWith('https://placehold.co')) return; // Don't open for placeholders
    modalImage.src = imageUrl;
    profileModal.classList.remove('hidden');
    lucide.createIcons(); // Ensure close icon is rendered
}

/**
 * Closes the profile picture modal.
 */
function closeProfileModal() {
    profileModal.classList.add('hidden');
    modalImage.src = ''; // Clear image src
}

/**
 * Toggles the emoji picker visibility.
 */
function toggleEmojiPicker() {
    console.log("Toggling emoji picker");
    if (!emojiPickerContainer) {
        console.error("Emoji picker container not found!");
        return;
    }
    
    // Toggle the container visibility
    emojiPickerContainer.classList.toggle('hidden');
    console.log("Emoji picker hidden state:", emojiPickerContainer.classList.contains('hidden'));
    
    // If showing the picker, ensure the emoji-picker element is initialized
    if (!emojiPickerContainer.classList.contains('hidden')) {
        const picker = emojiPickerContainer.querySelector('emoji-picker');
        if (!picker) {
            console.error("Emoji picker element missing inside container!");
            return;
        }
        
        // Remove any existing listeners to prevent duplicates
        picker.removeEventListener('emoji-click', handleEmojiSelection);
        
        // Add the emoji selection listener
        picker.addEventListener('emoji-click', handleEmojiSelection);
        
        console.log("Emoji picker initialized and listener attached");
    }
}

/**
 * Handles emoji selection from the picker.
 * @param {CustomEvent} event - The emoji-click event.
 */
function handleEmojiSelection(event) {
    console.log("Emoji selected:", event.detail);
    const emoji = event.detail.unicode;
    insertEmoji(emoji);
    
    // Hide the picker after selection
    if (emojiPickerContainer) {
        emojiPickerContainer.classList.add('hidden');
    }
}

/**
 * Inserts an emoji at the current cursor position in the message input.
 * @param {string} emoji - The emoji to insert.
 */
function insertEmoji(emoji) {
    if (!messageInput) {
        console.error("Message input not found!");
        return;
    }
    
    const start = messageInput.selectionStart;
    const end = messageInput.selectionEnd;
    const text = messageInput.value;
    
    // Insert the emoji at the cursor position
    messageInput.value = text.substring(0, start) + emoji + text.substring(end);
    
    // Update cursor position
    const newCursorPos = start + emoji.length;
    messageInput.setSelectionRange(newCursorPos, newCursorPos);
    
    // Focus back on the input
    messageInput.focus();
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded, initializing...");
    populateSidebar();
    setChatBackground('chat-background.jpg'); 
    lucide.createIcons();

    // --- Event Listeners Setup ---
    console.log("Setting up event listeners...");

    // Status Toggle
    if (statusToggle) {
        statusToggle.addEventListener('click', toggleStatusSection);
    } else {
        console.error("Status toggle button not found!");
    }

    // Background Changer
    if (bgChangerButton) {
        bgChangerButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            toggleBackgroundDropdown();
        });
    } else {
        console.error("Background changer button not found!");
    }

    // Background Selection
    if (bgDropdown) {
        bgDropdown.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                const selectedBg = event.target.getAttribute('data-bg');
                if (selectedBg) {
                    setChatBackground(selectedBg);
                    bgDropdown.classList.add('hidden');
                }
            }
        });
    } else {
        console.error("Background dropdown not found!");
    }

    // Emoji Picker Button
    if (emojiButton) {
        emojiButton.addEventListener('click', (event) => {
            console.log("Emoji button clicked");
            event.stopPropagation(); // Prevent the click from bubbling up
            toggleEmojiPicker();
        });
    } else {
        console.error("Emoji button not found!");
    }

    // Send Button
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    } else {
        console.error("Send button not found!");
    }

    // Message Input (Enter key)
    if (messageInput) {
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !sendButton.disabled) {
                event.preventDefault();
                sendMessage();
            }
        });
    } else {
        console.error("Message input not found!");
    }
    
    // Modal Close Button
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeProfileModal);
    } else {
        console.error("Modal close button not found!");
    }

    // Modal Background Click
    if (profileModal) {
        profileModal.addEventListener('click', (event) => {
            if (event.target === profileModal) {
                closeProfileModal();
            }
        });
    } else {
        console.error("Profile modal not found!");
    }

    // Close emoji picker when clicking outside
    document.addEventListener('click', (event) => {
        if (emojiPickerContainer && !emojiPickerContainer.classList.contains('hidden')) {
            if (!emojiButton.contains(event.target) && !emojiPickerContainer.contains(event.target)) {
                emojiPickerContainer.classList.add('hidden');
            }
        }
    });

    console.log("Initialization complete.");
}); 