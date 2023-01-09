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
//use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/club')]
class ClubController extends AbstractController
{
    #[Route('/', name: 'app_club_index', methods: ['GET'])]
    public function index( ManagerRegistry $doctrine): JsonResponse
    {
        $club = $doctrine->getRepository(Club::class)->findAll();
        return $this->json(
           $club
   );
    }

    #[Route('/new', name: 'app_club_new', methods: [ 'GET','POST'])]
    public function new(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $club = new Club();
        $parameter =json_decode($request->getContent(),true);
        $club->setName($parameter['Name']);
        $club->setTelephone($parameter['Telephone']);
        $club->setDescription($parameter['Description']);
        $club->setLogo($parameter['logo']);
/*         $club->setImageName($parameter['imageName']);
 */
      //  $club_create = $doctrine->getRepository(Club::class)->add($club);
        $em =$doctrine->getManager();
        $em ->persist($club);
        $em->flush($club);

     return new JsonResponse($club, Response::HTTP_CREATED,[
        'club' => "Updated"
    ]);
  
    }

    #[Route('/{id}', name: 'app_club_show', methods: ['GET'])]
    public function show(Club $club,ManagerRegistry $doctrine , int $id): Response
    {
     $club = $doctrine->getRepository(Club::class)->find($id);
     if(!$club){
        throw $this->createNotFoundException(
            'no Club found for id '.$id
        );
     }
     return $this->json($club);
    }

    #[Route('/edit/{id}', name: 'app_club_edit', methods: ['PUT'])]
    public function edit(Request $request, Club $club, ClubRepository $clubRepository,ManagerRegistry $doctrine ,$id): Response
    {
       $entityManager = $doctrine->getManager();
       $club= $entityManager->getRepository(Club::class)->find($id);
       if (!$club) {
        throw $this->createNotFoundException(
            'No club found for id '.$id
        );
       }
       $parameter=json_decode($request->getContent(),true);
       $club->setName($parameter['name']);
       $club->setTelephone($parameter['telephone']);
       $club->setDescription($parameter['description']);
       $club->setLogo($parameter['logo']);
/*        $club->setImageName($parameter['imageName']);
 */       $entityManager->flush();
       return $this->json([
        'club' => "Updated"
    ]);
    }

    #[Route('/{id}', name: 'app_club_delete' , methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine ,$id): Response
    {
    
       $entityManager=$doctrine->getManager();
       $club = $entityManager->getRepository(Club::class)->find($id);
        
        if(!$club){

            throw $this->createNotFoundException(
                'No club found for  id '.$id
            );
        } 
          /*  $entityManager->getRepository(Club::class)->remove($club); 
            return $this->json([
                'club' => $club
            ]); */
            $em =$doctrine->getManager();
            $em ->remove($club);
            $em->flush($club);   
    
            return new JsonResponse(null, Response::HTTP_NO_CONTENT, ['Club' => "Deleted"]);
        }
 

}