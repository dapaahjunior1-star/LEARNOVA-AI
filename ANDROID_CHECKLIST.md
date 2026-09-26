# LEARNOVA AI Android Testing Checklist

## UI
- [ ] App opens without crashing
- [ ] LEARNOVA logo appears correctly
- [ ] Home cards are readable
- [ ] Bottom navigation fits the phone
- [ ] Dark theme looks correct

## AI
- [ ] Chat sends a question
- [ ] AI response appears
- [ ] Study Mode works
- [ ] Research Mode works

## PDF
- [ ] PDF picker opens
- [ ] PDF uploads
- [ ] PDF status changes to ready
- [ ] Ask PDF returns an answer
- [ ] Summary works
- [ ] Explain Simply works
- [ ] Quiz works
- [ ] 20 MB limit is handled

## Phone
- [ ] Back button behaves correctly
- [ ] Keyboard does not cover the input
- [ ] Screen rotates safely or rotation is controlled
- [ ] Poor network shows a useful error

## Security
- [ ] OpenAI API key is NOT inside APK/frontend
- [ ] Backend uses HTTPS in production
- [ ] User authentication is enabled before public launch
- [ ] Rate limits are enabled
- [ ] PDF retention/deletion policy is defined
