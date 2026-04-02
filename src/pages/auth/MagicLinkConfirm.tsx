import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MagicLinkConfirm() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-elevation">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Link enviado!</CardTitle>
          <CardDescription>
            Verifique sua caixa de entrada e clique no link para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/login">Voltar para login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
