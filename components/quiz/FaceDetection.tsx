'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Loading } from '@/components/ui/Loading'
import { Badge } from '@/components/ui/Badge'
import { Camera, Upload, RotateCcw, Check, X, Zap } from 'lucide-react'
import { 
  startFaceDetection, 
  stopFaceDetection, 
  detectFaceFromImage,
  isCameraAvailable,
  type FaceAnalysis 
} from '@/lib/faceDetection'

interface FaceDetectionProps {
  onAnalysisComplete: (analysis: FaceAnalysis) => void
  onSkip?: () => void
}

export function FaceDetection({ onAnalysisComplete, onSkip }: FaceDetectionProps) {
  const [mode, setMode] = useState<'select' | 'camera' | 'upload'>('select')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cameraAvailable, setCameraAvailable] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [analysis, setAnalysis] = useState<FaceAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check camera availability on mount
  useEffect(() => {
    isCameraAvailable().then(setCameraAvailable)
  }, [])

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stopFaceDetection(stream)
      }
    }
  }, [stream])

  const handleCameraStart = useCallback(async () => {
    if (!videoRef.current) return
    
    setError(null)
    setIsAnalyzing(true)
    
    try {
      const newStream = await startFaceDetection(
        videoRef.current,
        (detectedAnalysis) => {
          setAnalysis(detectedAnalysis)
        }
      )
      setStream(newStream)
      setMode('camera')
    } catch (err) {
      setError('Failed to access camera. Please check permissions.')
      console.error('Camera error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const handleCameraStop = useCallback(() => {
    if (stream) {
      stopFaceDetection(stream)
      setStream(null)
    }
    setMode('select')
    setAnalysis(null)
  }, [stream])

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setIsAnalyzing(true)

    try {
      const img = new Image()
      img.onload = async () => {
        try {
          const detectedAnalysis = await detectFaceFromImage(img)
          setAnalysis(detectedAnalysis)
          setMode('upload')
        } catch (err) {
          setError('Failed to analyze the image. Please try another photo.')
          console.error('Image analysis error:', err)
        } finally {
          setIsAnalyzing(false)
        }
      }
      img.onerror = () => {
        setError('Failed to load the image. Please try another file.')
        setIsAnalyzing(false)
      }
      img.src = URL.createObjectURL(file)
    } catch (err) {
      setError('Failed to process the image.')
      setIsAnalyzing(false)
    }
  }, [])

  const handleConfirmAnalysis = useCallback(() => {
    if (analysis) {
      onAnalysisComplete(analysis)
    }
  }, [analysis, onAnalysisComplete])

  const handleRetry = useCallback(() => {
    setAnalysis(null)
    setError(null)
    if (stream) {
      stopFaceDetection(stream)
      setStream(null)
    }
    setMode('select')
  }, [stream])

  // Mode selection screen
  if (mode === 'select') {
    return (
      <Card variant="cyberpunk" className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-heading gradient-text mb-2">
            AI Face Analysis
          </CardTitle>
          <p className="text-neutral-gray">
            Let our AI analyze your face shape for personalized frame recommendations
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="neon"
              size="lg"
              className="h-32 flex-col space-y-3"
              onClick={handleCameraStart}
              disabled={!cameraAvailable || isAnalyzing}
            >
              <Camera className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Use Camera</div>
                <div className="text-xs opacity-80">Real-time analysis</div>
              </div>
            </Button>

            <Button
              variant="cyberpunk"
              size="lg"
              className="h-32 flex-col space-y-3"
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
            >
              <Upload className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Upload Photo</div>
                <div className="text-xs opacity-80">Analyze from image</div>
              </div>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {!cameraAvailable && (
            <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
              <p className="text-warning text-sm">
                Camera not available. Please use the upload option instead.
              </p>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-error/10 rounded-lg border border-error/20">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {onSkip && (
            <div className="text-center pt-4 border-t border-white/20">
              <Button variant="ghost" onClick={onSkip}>
                Skip AI Analysis
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center">
              <Loading text="Processing..." />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Camera mode
  if (mode === 'camera') {
    return (
      <Card variant="cyberpunk" className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-heading gradient-text mb-2">
            AI Face Analysis
          </CardTitle>
          <p className="text-neutral-gray">
            Position your face in the center of the frame
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full max-w-md mx-auto rounded-lg border-2 border-primary/30 shadow-neon-glow"
            />
            
            {/* Face detection overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-2 border-primary rounded-lg animate-pulse">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
              </div>
            </div>
          </div>

          {analysis && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-neutral-dark">Face Detected!</span>
                </div>
                <Badge variant="neon" className="text-lg px-4 py-2">
                  {analysis.faceShape.shape.charAt(0).toUpperCase() + analysis.faceShape.shape.slice(1)} Face
                </Badge>
                <p className="text-sm text-neutral-gray mt-2">
                  Confidence: {Math.round(analysis.faceShape.confidence * 100)}%
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="success" onClick={handleConfirmAnalysis}>
                  <Check className="w-4 h-4 mr-2" />
                  Use This Analysis
                </Button>
                <Button variant="outline" onClick={handleRetry}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleCameraStop}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Upload mode with analysis results
  if (mode === 'upload' && analysis) {
    return (
      <Card variant="cyberpunk" className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-heading gradient-text mb-2">
            Analysis Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="neon" className="text-2xl px-6 py-3 mb-4">
              {analysis.faceShape.shape.charAt(0).toUpperCase() + analysis.faceShape.shape.slice(1)} Face Shape
            </Badge>
            <p className="text-neutral-gray">
              Confidence: {Math.round(analysis.faceShape.confidence * 100)}%
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-neutral-dark">
              Recommendations for you:
            </h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/20 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm text-neutral-dark">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="neon" onClick={handleConfirmAnalysis}>
              <Check className="w-4 h-4 mr-2" />
              Continue with Results
            </Button>
            <Button variant="outline" onClick={handleRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}