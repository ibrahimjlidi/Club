<?php

namespace App\Controller;

use App\Entity\Club;
use App\Form\ClubType;
use App\Repository\ClubRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

//use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/club')]
class ClubController extends AbstractController
{
    #[Route('/', name: 'app_club_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $club = $doctrine->getRepository(Club::class)->findAll();
        return $this->json(
            $club
        );
    }

    #[Route('/new', name: 'app_club_new', methods: ['POST'])]
    public function new(Request $request, ManagerRegistry $doctrine): Response
    {
        $club = new Club();
        $parameter = json_decode($request->getContent(), true);
        $club->setName($parameter['name']);
        $club->setTelephone($parameter['phone']);
        $club->setDescription($parameter['description']);
        $club->setLogo($parameter['logo']);
      /*   $club->setImageName(($parameter['imageName'])); */
        /*         $club->setImageName($parameter['imageName']);
 */
        /*  $errors = $validator->validate($club);
            if ($errors->count() > 0) {
    return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
} */
        //  $club_create = $doctrine->getRepository(Club::class)->add($club);

        $em = $doctrine->getManager();
        $em->persist($club);
        $em->flush($club);

        return $this->json([
            'club' => "Updated"
        ]);
    }

    #[Route('/{id}', name: 'app_club_show', methods: ['GET'])]
    public function show(Club $club, ManagerRegistry $doctrine, int $id): Response
    {
        $club = $doctrine->getRepository(Club::class)->find($id);
        if (!$club) {
            throw $this->createNotFoundException(
                'no Club found for id ' . $id
            );
        }
        return $this->json($club);
    }

    #[Route('/{id}/{name}', name: 'app_club_showClub', methods: ['GET'])]
public function showClub(Club $club, ManagerRegistry $doctrine, int $id, string $name): Response
{
    $club = $doctrine->getRepository(Club::class)->find($id);
    if (!$club) {
        throw $this->createNotFoundException(
            'no Club found for id ' . $id
        );
    }
    if ($club->getName() !== $name) {
        throw $this->createNotFoundException(
            'id and name do not correspond to the same club'
        );
    }
    return $this->json($club);
}
    #[Route('/edit/{id}', name: 'app_club_edit', methods: ['PUT'])]
    public function edit(Request $request, Club $club, ClubRepository $clubRepository, ManagerRegistry $doctrine, $id): Response
    {
        $entityManager = $doctrine->getManager();
        $club = $entityManager->getRepository(Club::class)->find($id);
        if (!$club) {
            throw $this->createNotFoundException(
                'No club found for id ' . $id
            );
        }
        $parameter = json_decode($request->getContent(), true);
        $club->setName($parameter['name']);
        $club->setTelephone($parameter['telephone']);
        $club->setDescription($parameter['description']);
        $club->setLogo($parameter['logo']);
       /*  $club->setImageName($parameter['imageName']); */

        $entityManager->flush();
        return $this->json([
            'club' => "Updated"
        ]);
    }

    #[Route('/{id}', name: 'app_club_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, $id): Response
    {

        $entityManager = $doctrine->getManager();
        $club = $entityManager->getRepository(Club::class)->find($id);

        if (!$club) {

            throw $this->createNotFoundException(
                'No club found for  id ' . $id
            );
        }
        /*  $entityManager->getRepository(Club::class)->remove($club); 
            return $this->json([
                'club' => $club
            ]); */
        $em = $doctrine->getManager();
        $em->remove($club);
        $em->flush($club);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT, ['Club' => "Deleted"]);
    }
}
