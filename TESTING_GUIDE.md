# Interview Platform - Complete Setup & Testing Guide

## 📋 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with camera/microphone support

### Installation & Running

```bash
# Navigate to frontend directory
cd "d:\FSAD\interview_platform Frontend\frontend"

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:5173/**

---

## 🧪 Testing Scenarios

### **Scenario 1: Basic Interview Flow (Without Backend)**

#### Prerequisites:
- No backend server needed
- Use mock API responses

#### Steps:
1. Open http://localhost:5173/
2. Click "Get Started" or "Start Free Interview"
3. Create a test account or use existing credentials
4. Navigate to Dashboard
5. Start a new interview

#### Expected Behavior:
- Landing page loads with all sections visible
- Login/Register page is accessible
- Dashboard shows interview options
- Can select interview role

---

### **Scenario 2: Resume Upload Testing**

#### Test Case 2.1: Valid Resume Upload
1. Go to Interview page
2. Click "Upload Resume" button
3. Select a PDF file (less than 5MB)
4. Expected: 
   - ✅ Success message appears
   - ✅ Resume status shows "Resume uploaded successfully"
   - ✅ "Next Question" button becomes enabled

#### Test Case 2.2: Invalid File Type
1. Try to upload a TXT file
2. Expected:
   - ❌ Error message: "Invalid file type"
   - ✅ Upload is cancelled

#### Test Case 2.3: File Too Large
1. Try to upload a file > 5MB
2. Expected:
   - ❌ Error message: "Resume file too large (max 5MB)"
   - ✅ Upload is cancelled

---

### **Scenario 3: Role-Based Question Selection**

#### Test Case 3.1: Default Role (Frontend)
1. Open Interview page
2. Role dropdown shows "frontend" selected
3. Questions load for frontend role
4. Expected:
   - ✅ Questions are displayed
   - ✅ Each question relates to frontend topics

#### Test Case 3.2: Change Role
1. Select "backend" from role dropdown
2. Expected:
   - ✅ Questions reload immediately
   - ✅ Questions are backend-related
   - ✅ Answer field is cleared
   - ✅ Progress resets to question 1

#### Test Case 3.3: Try All Roles
- Repeat with: python, java, ai roles
- Expected:
  - ✅ Each role has dedicated questions
  - ✅ State resets properly for each role

---

### **Scenario 4: Interview Answering & Navigation**

#### Test Case 4.1: Answer Question
1. Type or speak an answer to the displayed question
2. Expected:
   - ✅ Answer appears in textarea
   - ✅ Answer is stored locally

#### Test Case 4.2: Voice Recording
1. Click "Voice Answer" button
2. Speak an answer
3. Expected:
   - ✅ Button changes to "Stop Recording"
   - ✅ Audio is captured and transcribed
   - ✅ Text appears in answer field

#### Test Case 4.3: Navigate Questions
1. Click "Next Question" button
2. Expected:
   - ✅ Current answer is saved
   - ✅ Progress bar updates
   - ✅ Next question is displayed
   - ✅ Answer field clears for new question

#### Test Case 4.4: Code Editor
1. Click "Code Editor" button
2. Type some code
3. Expected:
   - ✅ Code panel appears
   - ✅ Code is saved locally
   - ✅ Can submit with code

---

### **Scenario 5: Interview Submission & Scoring**

#### Test Case 5.1: Complete Interview
1. Answer all questions
2. On last question, button shows "Finish Interview"
3. Click to finish
4. Expected:
   - ✅ Loading state appears ("Evaluating...")
   - ✅ AI evaluation completes
   - ✅ Feedback is displayed
   - ✅ Redirects to Results page

#### Test Case 5.2: Score Display
On Results page, verify:
- ✅ Latest score is displayed (prominent number)
- ✅ Grade shows (Excellent/Strong/Good/Needs Improvement)
- ✅ Color coding matches grade
- ✅ Score is out of 100

#### Test Case 5.3: Average Score
After completing 2+ interviews:
1. Complete another interview
2. Go to Results page
3. Expected:
   - ✅ Average score is calculated
   - ✅ Shows average of all interviews
   - ✅ Updates correctly

---

### **Scenario 6: Interview History**

#### Test Case 6.1: View History (After 2+ Interviews)
1. Complete at least 2 interviews in different roles
2. Go to Results page
3. Expected:
   - ✅ "Interview History" section appears
   - ✅ Lists all past interviews (reverse chronological)
   - ✅ Shows role, date, and score for each
   - ✅ Most recent first

#### Test Case 6.2: History Pagination
1. If many interviews, check scrolling
2. Expected:
   - ✅ All interviews are visible
   - ✅ Proper sorting (newest first)

---

### **Scenario 7: Admin Panel Testing**

#### Test Case 7.1: View Questions
1. Navigate to Admin > Questions
2. Expected:
   - ✅ Questions are loaded from database
   - ✅ Table displays question data
   - ✅ Search and filter work

#### Test Case 7.2: Error Handling (No Backend)
1. Try to fetch questions without backend
2. Expected:
   - ✅ Graceful error message
   - ✅ "Could not fetch questions from server" alert
   - ✅ Empty questions list shown
   - ✅ App doesn't crash

#### Test Case 7.3: Add Question
1. Click "Add Question" button
2. Fill in question details
3. Click Save
4. Expected:
   - ✅ Modal opens
   - ✅ Form validation works
   - ✅ Success/error messages appear

---

## 🔧 Configuration

### Environment Variables
Create `.env` file in `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### For Testing Without Backend:
You can use the mock API functions provided in `src/api/mockApi.js`

---

## 🐛 Troubleshooting

### Issue: Questions not loading
**Solution:**
1. Check browser console for errors
2. Verify API endpoint is correct
3. Backend server is running (if using real API)
4. Check network tab in DevTools

### Issue: Resume upload fails
**Solution:**
1. File must be PDF or DOCX
2. File size must be under 5MB
3. Check browser permissions
4. Verify `/api/resume/upload` endpoint exists

### Issue: No average score showing
**Solution:**
1. Must complete at least 1 interview
2. Score must be saved to localStorage
3. Check browser's localStorage is enabled
4. Try clearing localStorage and running again

### Issue: Role change doesn't work
**Solution:**
1. Clear browser cache
2. Check console for JavaScript errors
3. Verify question endpoint returns data for selected role

---

## 📊 Test Data

### Sample Questions (Frontend Role):
```
1. What are React hooks?
2. Explain virtual DOM
3. What is Redux?
4. CSS Grid vs Flexbox?
5. What are higher-order components?
```

### Sample Scores:
- Interview 1: 78 (Good)
- Interview 2: 85 (Strong)
- Interview 3: 92 (Excellent)
- Average: 85

---

## ✅ Verification Checklist

- [ ] Landing page loads without errors
- [ ] Login/Register flow works
- [ ] Dashboard is accessible
- [ ] Interview page loads with questions
- [ ] Role selection works and resets state
- [ ] Resume upload validates file type/size
- [ ] Questions can be answered
- [ ] Voice recording works (browser support)
- [ ] Progress bar updates correctly
- [ ] Interview submission works
- [ ] Score is calculated and displayed
- [ ] Results page shows latest score
- [ ] Average score is calculated correctly
- [ ] Interview history is visible (2+ interviews)
- [ ] Admin panel loads without crashing
- [ ] Error messages are user-friendly
- [ ] localStorage persists data correctly
- [ ] No JavaScript errors in console

---

## 🚀 Performance Tips

1. **Clear localStorage** before testing new features:
   ```javascript
   localStorage.clear();
   ```

2. **Check DevTools Network Tab** to see API calls:
   - Watch for failed requests
   - Check response times

3. **Monitor Console** for warnings:
   - Look for deprecation warnings
   - React warnings about dependencies

4. **Test in Incognito Mode** for clean session:
   - Helps avoid cache issues
   - Tests fresh localStorage state

---

## 🔐 Security Notes

- Never commit `.env` files with real credentials
- Resume uploads should be validated on backend too
- Implement rate limiting for API calls
- Store sensitive data securely (scores, user data)
- Validate all user inputs on backend

---

## 📱 Browser Compatibility

### Supported Browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features:
- ES2020+ JavaScript support
- CSS Grid and Flexbox
- Web Audio API (for voice recording)
- Canvas API
- localStorage

---

## 🎯 Success Criteria

All tests pass when:
1. ✅ No JavaScript errors in console
2. ✅ All UI elements respond to user input
3. ✅ API calls handle errors gracefully
4. ✅ Data persists correctly
5. ✅ Performance is acceptable (< 3s load time)
6. ✅ Mobile responsiveness works
7. ✅ Accessibility features work

---

## 📞 Support Resources

- Check FIXES_APPLIED.md for detailed fix documentation
- See src/api/mockApi.js for mock data structures
- Review .env.example for configuration
- Check individual component comments for implementation details

---

## 📝 Notes for Developers

1. **Mock API**: Use `src/api/mockApi.js` when backend is unavailable
2. **Error Handling**: All API calls have fallback mechanisms
3. **localStorage**: Primary persistence layer (use database in production)
4. **Toast Notifications**: Used for all user feedback
5. **Loading States**: Show during async operations

---

**Last Updated**: May 27, 2026
**Version**: 1.0 (Fixed and Enhanced)
