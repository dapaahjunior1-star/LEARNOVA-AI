# LEARNOVA AI — Android-ready v2

LEARNOVA AI is a learning and research assistant with AI chat and PDF learning.

### Current features
- AI Chat
- Study Mode
- Research Mode starter
- PDF upload
- Ask questions about PDFs
- PDF summary
- Explain Simply
- PDF quiz generation
- Mobile-first UI

### Android
The project includes a Capacitor Android wrapper configuration with package ID:

`com.learnova.ai`

See `ANDROID_BUILD.md` for the build/install process and `ANDROID_CHECKLIST.md` for phone testing.

### Security
Keep `OPENAI_API_KEY` only on the server. Never place it in the Android app.

### Production
Before public release, deploy the backend over HTTPS, add authentication and data controls, configure a production URL, then build a signed AAB for Google Play.
