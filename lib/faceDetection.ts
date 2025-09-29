import * as tf from '@tensorflow/tfjs'

export interface FaceShape {
  shape: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong'
  confidence: number
  measurements: {
    faceWidth: number
    faceHeight: number
    jawWidth: number
    foreheadWidth: number
    cheekboneWidth: number
  }
}

export interface FaceAnalysis {
  faceShape: FaceShape
  features: {
    eyeDistance: number
    noseWidth: number
    lipWidth: number
  }
  recommendations: string[]
}

// Face shape classification based on measurements
export function classifyFaceShape(measurements: FaceShape['measurements']): FaceShape {
  const { faceWidth, faceHeight, jawWidth, foreheadWidth, cheekboneWidth } = measurements
  const aspectRatio = faceHeight / faceWidth
  const jawToFaceRatio = jawWidth / faceWidth
  const foreheadToFaceRatio = foreheadWidth / faceWidth
  const cheekboneToFaceRatio = cheekboneWidth / faceWidth

  let shape: FaceShape['shape'] = 'oval'
  let confidence = 0.5

  // Oval: balanced proportions, slightly longer than wide
  if (aspectRatio >= 1.2 && aspectRatio <= 1.6 && 
      Math.abs(jawToFaceRatio - foreheadToFaceRatio) < 0.1) {
    shape = 'oval'
    confidence = 0.8
  }
  // Round: equal width and height, soft curves
  else if (aspectRatio >= 0.9 && aspectRatio <= 1.1 && 
           cheekboneToFaceRatio > 0.8) {
    shape = 'round'
    confidence = 0.8
  }
  // Square: strong jawline, equal width and height
  else if (aspectRatio >= 0.9 && aspectRatio <= 1.1 && 
           jawToFaceRatio > 0.8 && foreheadToFaceRatio > 0.8) {
    shape = 'square'
    confidence = 0.8
  }
  // Heart: wider forehead, narrower chin
  else if (foreheadToFaceRatio > cheekboneToFaceRatio && 
           cheekboneToFaceRatio > jawToFaceRatio && 
           aspectRatio >= 1.1) {
    shape = 'heart'
    confidence = 0.8
  }
  // Diamond: narrow forehead and chin, wider cheekbones
  else if (cheekboneToFaceRatio > foreheadToFaceRatio && 
           cheekboneToFaceRatio > jawToFaceRatio && 
           aspectRatio >= 1.1) {
    shape = 'diamond'
    confidence = 0.8
  }
  // Oblong: significantly longer than wide
  else if (aspectRatio > 1.6) {
    shape = 'oblong'
    confidence = 0.7
  }

  return {
    shape,
    confidence,
    measurements
  }
}

// Generate frame recommendations based on face shape
export function generateFrameRecommendations(faceShape: FaceShape['shape']): string[] {
  const recommendations: Record<FaceShape['shape'], string[]> = {
    oval: [
      'You have the ideal face shape! Most frame styles will suit you.',
      'Try bold, geometric frames to add character',
      'Cat-eye frames will enhance your natural balance',
      'Avoid frames that are too large or too small'
    ],
    round: [
      'Angular frames will add definition to your soft features',
      'Square or rectangular frames are perfect for you',
      'Avoid round frames that echo your face shape',
      'Try frames wider than your face for a slimming effect'
    ],
    square: [
      'Soft, rounded frames will balance your strong jawline',
      'Oval or cat-eye frames are ideal choices',
      'Avoid square frames that emphasize your angles',
      'Try frames with curved edges and softer lines'
    ],
    heart: [
      'Bottom-heavy frames will balance your narrow chin',
      'Cat-eye or butterfly frames are perfect for you',
      'Avoid top-heavy frames that emphasize your forehead',
      'Try frames with decorative elements on the bottom'
    ],
    diamond: [
      'Frames that highlight your eyes are ideal',
      'Cat-eye or oval frames work wonderfully',
      'Avoid frames that are too narrow',
      'Try frames that are wider at the top and bottom'
    ],
    oblong: [
      'Wide frames will shorten your face visually',
      'Oversized or wraparound styles are great choices',
      'Avoid narrow frames that elongate your face',
      'Try frames with bold colors or patterns'
    ]
  }

  return recommendations[faceShape] || recommendations.oval
}

// Simulate face detection using canvas analysis
export async function detectFaceFromImage(imageElement: HTMLImageElement): Promise<FaceAnalysis> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Canvas context not available')
    }

    canvas.width = imageElement.width
    canvas.height = imageElement.height
    ctx.drawImage(imageElement, 0, 0)

    // Simulate face detection measurements
    // In a real implementation, this would use TensorFlow.js or MediaPipe
    const simulatedMeasurements = {
      faceWidth: imageElement.width * 0.6,
      faceHeight: imageElement.height * 0.8,
      jawWidth: imageElement.width * 0.5,
      foreheadWidth: imageElement.width * 0.55,
      cheekboneWidth: imageElement.width * 0.58
    }

    const faceShape = classifyFaceShape(simulatedMeasurements)
    const recommendations = generateFrameRecommendations(faceShape.shape)

    // Simulate processing time
    setTimeout(() => {
      resolve({
        faceShape,
        features: {
          eyeDistance: simulatedMeasurements.faceWidth * 0.3,
          noseWidth: simulatedMeasurements.faceWidth * 0.15,
          lipWidth: simulatedMeasurements.faceWidth * 0.25
        },
        recommendations
      })
    }, 1500) // Simulate AI processing time
  })
}

// Face detection using camera stream
export async function startFaceDetection(
  videoElement: HTMLVideoElement,
  onDetection: (analysis: FaceAnalysis) => void
): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: 640, 
        height: 480,
        facingMode: 'user' 
      } 
    })
    
    videoElement.srcObject = stream
    
    // Start detection loop
    const detectFaces = () => {
      if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        // Create a canvas to capture frame
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (ctx) {
          canvas.width = videoElement.videoWidth
          canvas.height = videoElement.videoHeight
          ctx.drawImage(videoElement, 0, 0)
          
          // Simulate face detection
          const simulatedMeasurements = {
            faceWidth: canvas.width * 0.6,
            faceHeight: canvas.height * 0.8,
            jawWidth: canvas.width * 0.5,
            foreheadWidth: canvas.width * 0.55,
            cheekboneWidth: canvas.width * 0.58
          }
          
          const faceShape = classifyFaceShape(simulatedMeasurements)
          const recommendations = generateFrameRecommendations(faceShape.shape)
          
          onDetection({
            faceShape,
            features: {
              eyeDistance: simulatedMeasurements.faceWidth * 0.3,
              noseWidth: simulatedMeasurements.faceWidth * 0.15,
              lipWidth: simulatedMeasurements.faceWidth * 0.25
            },
            recommendations
          })
        }
      }
      
      // Continue detection
      requestAnimationFrame(detectFaces)
    }
    
    videoElement.addEventListener('loadedmetadata', () => {
      detectFaces()
    })
    
    return stream
  } catch (error) {
    console.error('Error accessing camera:', error)
    throw new Error('Camera access denied or not available')
  }
}

// Stop face detection and camera stream
export function stopFaceDetection(stream: MediaStream) {
  stream.getTracks().forEach(track => track.stop())
}

// Utility to check if camera is available
export async function isCameraAvailable(): Promise<boolean> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.some(device => device.kind === 'videoinput')
  } catch (error) {
    return false
  }
}

// Get frame recommendations based on face analysis and quiz answers
export function getPersonalizedRecommendations(
  faceAnalysis: FaceAnalysis,
  quizAnswers: {
    style?: string[]
    lifestyle?: string[]
    colors?: string[]
    budget?: string
  }
): {
  primaryRecommendations: string[]
  styleMatches: string[]
  colorSuggestions: string[]
} {
  const { faceShape, recommendations } = faceAnalysis
  const { style = [], lifestyle = [], colors = [], budget } = quizAnswers

  // Combine face shape recommendations with style preferences
  const styleMatches: string[] = []
  
  if (style.includes('cyberpunk') && faceShape.shape === 'square') {
    styleMatches.push('Angular cyberpunk frames will complement your strong features')
  }
  if (style.includes('minimalist') && faceShape.shape === 'oval') {
    styleMatches.push('Clean, minimalist frames will enhance your balanced features')
  }
  if (style.includes('vintage') && faceShape.shape === 'round') {
    styleMatches.push('Vintage cat-eye frames will add definition to your soft features')
  }

  // Color suggestions based on preferences and face shape
  const colorSuggestions: string[] = []
  
  if (colors.includes('neon-pink')) {
    colorSuggestions.push('Neon pink frames will make a bold statement')
  }
  if (colors.includes('metallic') && faceShape.shape === 'diamond') {
    colorSuggestions.push('Metallic frames will highlight your cheekbones beautifully')
  }
  if (colors.includes('matte-black')) {
    colorSuggestions.push('Matte black frames offer versatile, sophisticated style')
  }

  return {
    primaryRecommendations: recommendations,
    styleMatches: styleMatches.length > 0 ? styleMatches : ['Your style preferences work well with your face shape'],
    colorSuggestions: colorSuggestions.length > 0 ? colorSuggestions : ['Any color will look great on you']
  }
}