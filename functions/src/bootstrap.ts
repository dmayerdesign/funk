import { initializeApp } from 'firebase-admin'
import * as functions from 'firebase-functions'

initializeApp({ projectId: functions.config().public.fire_project_id })
